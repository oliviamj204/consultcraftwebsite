import React, { useState, useLayoutEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Linkedin, User } from 'lucide-react';
import './teamcarousel.css';

const TeamCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewSettings, setViewSettings] = useState({
    membersPerSlide: 4,
    lastIndex: 0,
    itemWidth: 360,
    gap: 20,
  });

  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // --- Refs for swipe/drag functionality ---
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);

  const teamMembers = [
    { id: 1, name: "Anubhav Prasad", title: "Founder & CEO", image: "/asset/team/anubhav.jpg", hasLinkedIn: true, linkedinUrl: "https://www.linkedin.com/in/anubhav-prasad-3a843759/" },
    { id: 2, name: "Mukesh Prasad", title: "Director, India", image: "/asset/team/mukesh.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/mukesh-prasad-649a048a/" },
    { id: 3, name: "Col. Ajay Singh(Retd.)", title: "Director, India", image: "/asset/team/ajay.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/col-ajay-singh-veteran-a9b765129/" },
    { id: 4, name: "Tanner Smith", title: "Managing Partner (USA) & VP - SportsCove", image: "/asset/team/tanner.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/tanner-smith-153682329/" },
    { id: 5, name: "Andrew Tanner", title: "Managing Partner, USA", image: "/asset/team/andrew.jpg", hasLinkedIn: true, linkedinUrl:"" },
    { id: 6, name: "Deepa Raj", title: "VP - Engineering and Technology", image: "/asset/team/deepa.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/deepa-raj-b30467121/" },
    { id: 7, name: "Ira Prasad", title: "UX Designer", image: "/asset/team/ira.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/ira-prasad-5ba77016a/" },
    { id: 8, name: "Lakshmi Pratap", title: "UX Designer", image: "/asset/team/lakshmi.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/lakshmi-pratap/" },
    { id: 10, name: "Olivia Mary James", title: "Software Developer", image: "/asset/team/olivia.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/olivia-mary-james-533a98268/" },
    { id: 11, name: "Poojita Sharan", title: "Program & Services Head", image: "/asset/team/poojitha.jpg", hasLinkedIn: true, linkedinUrl:"https://www.linkedin.com/in/poojita-sharan/" },
  ];

  useLayoutEffect(() => {
    const handleResize = () => {
      if (trackRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = trackRef.current.children[0]?.offsetWidth || 360;
        const gap = parseInt(window.getComputedStyle(trackRef.current).gap) || 20;

        const membersPerView = Math.floor(containerWidth / (itemWidth + gap));
        const newLastIndex = teamMembers.length - membersPerView;

        setViewSettings({ membersPerSlide: membersPerView, lastIndex: newLastIndex, itemWidth, gap });

        if (currentIndex > newLastIndex) {
          setCurrentIndex(newLastIndex < 0 ? 0 : newLastIndex);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [teamMembers.length, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, viewSettings.lastIndex));
  };
  
  // --- Touch event handlers ---
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startPos.current = e.touches[0].clientX;
    prevTranslate.current = -currentIndex * (viewSettings.itemWidth + viewSettings.gap);
    trackRef.current.style.transition = 'none'; // Disable transition for smooth dragging
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate.current = currentPosition - startPos.current;
    const newTranslate = prevTranslate.current + currentTranslate.current;
    trackRef.current.style.transform = `translateX(${newTranslate}px)`;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.transition = 'transform 0.5s ease'; // Re-enable transition

    const swipeThreshold = viewSettings.itemWidth / 4;

    if (currentTranslate.current < -swipeThreshold) {
      nextSlide();
    } else if (currentTranslate.current > swipeThreshold) {
      prevSlide();
    } else {
      trackRef.current.style.transform = `translateX(-${currentIndex * (viewSettings.itemWidth + viewSettings.gap)}px)`;
    }
  };

  // --- NEW: Mouse event handlers for desktop drag ---
  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startPos.current = e.clientX;
    prevTranslate.current = -currentIndex * (viewSettings.itemWidth + viewSettings.gap);
    trackRef.current.style.transition = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const currentPosition = e.clientX;
    currentTranslate.current = currentPosition - startPos.current;
    const newTranslate = prevTranslate.current + currentTranslate.current;
    trackRef.current.style.transform = `translateX(${newTranslate}px)`;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.transition = 'transform 0.5s ease';

    const swipeThreshold = viewSettings.itemWidth / 4;

    if (currentTranslate.current < -swipeThreshold) {
      nextSlide();
    } else if (currentTranslate.current > swipeThreshold) {
      prevSlide();
    } else {
      trackRef.current.style.transform = `translateX(-${currentIndex * (viewSettings.itemWidth + viewSettings.gap)}px)`;
    }
  };

  return (
    <section className="team-section">
      <h2 className="team-heading">MEET OUR TEAM</h2>
      <div className="team-carousel-wrapper">
        {currentIndex > 0 && (
          <button className="carousel-nav carousel-nav-left" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="team-carousel-container" ref={containerRef}>
          <div
            className="team-carousel-track"
            ref={trackRef}
            // Add all event handlers for both mobile and desktop
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            style={{
              transform: `translateX(-${currentIndex * (viewSettings.itemWidth + viewSettings.gap)}px)`,
            }}
          >
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                  <div className="card-image">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="member-photo" />
                    ) : (
                      <div className="placeholder-image"><User size={48} /></div>
                    )}
                  </div>
                  <div className="carousel-card-content">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-title">{member.title}</p>
                    {member.hasLinkedIn && member.linkedinUrl && (
                      <div className="linkedin-icon">
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={20} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
        
        {currentIndex < viewSettings.lastIndex && (
          <button className="carousel-nav carousel-nav-right" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default TeamCarousel;