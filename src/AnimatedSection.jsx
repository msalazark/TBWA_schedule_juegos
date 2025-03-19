import React, { useEffect, useRef, useState } from "react";
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
          if (element) observer.unobserve(element);
        }
      },
      { threshold: 0.5 }
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
