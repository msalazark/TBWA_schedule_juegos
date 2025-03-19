import React from "react";
import "./PresentationScreen.css";
//import flecha from "/portada_flecha.png";

function PresentationScreen({ onContinue }) {
  return (
    <section className="presentation-screen">
      

      <img
        src="/logo-barqueros.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="texto-central"
        onClick={onContinue}
      />

      <img
        src="/portada_escape_room.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="texto-central"
        onClick={onContinue}
      />

      <img
        src="/portada_flecha.png" // Actualiza con la ruta correcta a la imagen de la flecha
        alt="Continuar"
        className="continue-arrow"
        onClick={onContinue}
      />


    </section>
  );
}



export default PresentationScreen;
