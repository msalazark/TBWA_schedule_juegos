import React, { useRef, useState, useEffect } from "react";
import "./AnimatedSection.css";

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current; 
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Deja de observar una vez que ya se hizo visible
          if (element) observer.unobserve(element);
        }
      },
      { threshold: 0.5 } // Ajusta el umbral según tus necesidades
    );
    
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };

  }, []);

  return (
    <div ref={ref} className={`animated-section ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default AnimatedSection;
