import React, { useRef } from 'react';
import './consultingareas.css';

const consultingAreas = [
  { name: 'Business Strategy', icon: '/asset/startegy.png' },
  { name: 'Marketing & Sales', icon: '/asset/bullhorn.png' },
  { name: 'Legal & Compliance', icon: '/asset/legal-document.png' },
  { name: 'Technology & Innovation', icon: '/asset/creative-idea.png' },
  { name: 'HR management', icon: '/asset/management.png' },
  { name: 'Project Management', icon: '/asset/project-management.png' },
];

const ConsultingAreasCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 240; // adjust per card width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="consulting-carousel-wrapper">
      <h2 className="consulting-carousel-title">CONSULTING AREAS WE'LL COVER</h2>

      <div className="carousel-navigation">
        <button className="consulting-carousel-arrow left" onClick={() => scroll('left')}>
          &lt;
        </button>

        <div className="consulting-carousel-items" ref={scrollRef}>
          {consultingAreas.map((area, index) => (
            <div className="consulting-carousel-item" key={index}>
              <img
                src={area.icon}
                alt={area.name}
                className="consulting-carousel-icon"
              />
              <p className="consulting-carousel-label">{area.name}</p>
            </div>
          ))}
        </div>

        <button className="consulting-carousel-arrow right" onClick={() => scroll('right')}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ConsultingAreasCarousel;
