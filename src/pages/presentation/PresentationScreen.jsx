import React, {useState} from "react";
import { motion } from "framer-motion";
import "./PresentationScreen.css";
//import flecha from "/portada_flecha.png";

function PresentationScreen({ onContinue }) {
  const [animateExit, setAnimateExit] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });

  // Variants para los tres estados
  const variants = {
    initial: {
      scale: 0.95,
      opacity: 0
    },
    enter: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };


  const handleClick = ( e ) => {
    // Activa la animación de salida
    setClickPos({ x: e.clientX, y: e.clientY });
    setAnimateExit(true);
  };

  return (


    <motion.section
    className="presentation-screen"
    variants={variants}
    initial="initial"                  // estado antes de entrar
    animate={animateExit ? "exit" : "enter"}
    onAnimationComplete={() => {
      if (animateExit) {
        onContinue(clickPos);
      }
    }}

    >

      <img
        src="/logo-barqueros.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="texto-central"
        onClick={handleClick}
      />

      <img
        src="/portada_escape_room.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="texto-central"
        onClick={handleClick}
      />

      <img
        src="/portada_flecha.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="continue-arrow"
        onClick={handleClick}
      />


    </motion.section>
  );
}



export default PresentationScreen;
