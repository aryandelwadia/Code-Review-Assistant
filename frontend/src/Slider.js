import React from 'react';
import { motion } from 'framer-motion';
import './Slider.css';

const advantages = [
  "Automated Code Reviews",
  "Instant Feedback",
  "Improved Code Quality",
  "Faster Development Cycles",
  "Consistent Coding Standards",
];

const Slider = () => {
  const marqueeVariants = {
    animate: {
      x: [0, -1500],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="slider-container font-orbitron text-white text-2xl">
      <motion.div
        className="slider-track"
        variants={marqueeVariants}
        animate="animate"
      >
        {[...advantages, ...advantages].map((advantage, index) => (
          <div key={index} className="slide">
            <p>{advantage}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;
