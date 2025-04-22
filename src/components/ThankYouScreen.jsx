import React from "react";
import "./ThankYouScreen.css";

const ThankYouScreen = ({ userName, gameDetails, onExit }) => {



  const handleShareWhatsapp = () => {
    const message = `¡Hola! Acabo de reservar "${gameDetails.title}" y ya estoy dentro. ¡Acompáñame en esta aventura!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="thankyou-container"
      style={{ backgroundColor: gameDetails.backgroundColor }}
    >
      {/* Header */}
      <header className="thankyou-header">
        <img
          src="/logo-barqueros.png"
          alt="Logo de la empresa"
          className="thankyou-logo"
        />
        <button className="thankyou-exit-btn" onClick={onExit}>
          Exit
        </button>
      </header>

      {/* Mensaje central */}
      <div className="thankyou-content">
        <h1>{userName},
          <br />
          Tu reserva ha sido confirmada
        </h1>
        <p>
          En breve un instructor de nuestro equipo te contactarás por WhatsApp 
        </p>
         
        <button
          className="whatsapp-btn"
          onClick={handleShareWhatsapp}
        >
          Compartir en WhatsApp
        </button>
      </div>

      {/* Imagen del juego: solo la mitad superior */}
      <div className="thankyou-game-image">
        <img
          src={gameDetails.image}
          alt={gameDetails.title}
        />
      </div>
    </div>
  );
};

export default ThankYouScreen;
