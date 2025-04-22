import React from "react";
import { motion } from "framer-motion";
import "./AnimatedSection.css";

const AnimatedSection = ({ children, onAnimationComplete }) => {
  return (
    <motion.div
      className="animated-section fullscreen"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
      style={{ transformOrigin: "center center" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
