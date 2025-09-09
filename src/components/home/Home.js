import React from 'react';
import HeroSection from './herosection';
import FeaturesSection from './scfeatures';
import SuperCoachesSection from './supercoaches';
import CoachCarousel from './coachcarousel';
import ConsultCoveSection from './consultcove';
import ConsultingAreasCarousel from './consultingareas';
import TestimonialsTicker from './testimonials';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SuperCoachesSection />
      <CoachCarousel />
      <ConsultCoveSection />
      <ConsultingAreasCarousel />
      <TestimonialsTicker />
    </>
  );
};

export default Home;