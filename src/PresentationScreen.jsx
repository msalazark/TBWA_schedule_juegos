import React from "react";
import "./PresentationScreen.css";

function PresentationScreen({ onContinue }) {
  return (
    <section className="presentation-screen">
      <h1>Bienvenidos a Escape Rooms</h1>
      <p>
        Descubre desafíos, resuelve pistas y vive una experiencia única. ¡Prepárate para poner a prueba tu ingenio!
      </p>
      <button className="continue-btn" onClick={onContinue}>
        Comenzar
      </button>
    </section>
  );
}

export default PresentationScreen;
