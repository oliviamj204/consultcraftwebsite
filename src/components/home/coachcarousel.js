import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coaches } from '../../data/coachdata';
import './coachcarousel.css';

const CoachCarousel = () => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [userHasClickedRight, setUserHasClickedRight] = useState(false);
  const navigate = useNavigate();

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 295 + 32; // card width + gap
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      if (direction === 'right') setUserHasClickedRight(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        setShowLeftArrow(userHasClickedRight && carouselRef.current.scrollLeft > 0);
      }
    };

    const ref = carouselRef.current;
    if (ref) ref.addEventListener('scroll', handleScroll);
    return () => ref && ref.removeEventListener('scroll', handleScroll);
  }, [userHasClickedRight]);

  return (
    <section className="coach-carousel-section">
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {showLeftArrow && (
            <button className="carousel-arrow left" onClick={() => scroll('left')}>
              &#8249;
            </button>
          )}

        <div className="carousel" ref={carouselRef}>
          {Object.entries(coaches)
            .filter(([id, coach]) => coach.CoachType?.toLowerCase() === 'super') // ✅ only super coaches
            .map(([id, coach]) => (
              <div className="carousel-item" key={id}>
                <img src={coach.carouselImage} alt={coach.name} />
                <div className="overlay">
                  <button
                    className="view-profile"
                    onClick={() => navigate(`/supercoaches/${id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
        </div>

        <button className="carousel-arrow right" onClick={() => scroll('right')}>
          &#8250;
        </button>
      </div>
    </div>
    </section>
  );
};

export default CoachCarousel;
