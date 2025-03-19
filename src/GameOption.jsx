import React from "react";


function GameOption({ game, onReserve, backgroundColor }) {
  return (
    <section className="game-option"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {/* Header con logo a la izquierda y botón de reserva a la derecha */}
      <div className="game-header">
        <img src="/logo-barqueros.png" alt="Logo de la empresa" className="game-logo" />
        <button className="reserve-btn" onClick={() => onReserve(game.id)}>
          Reservar
        </button>
      </div>
      
      {/* Separador horizontal */}
      <hr className="separator" />
      
      {/* Contenedor de columnas: dos columnas iguales */}
      <div className="game-columns">
        {/* Columna izquierda: imagen y datos */}
        <div className="column-left">
          <img src={game.image} alt={game.title} className="game-photo" />
          <div className="game-data">
            <div className="circle">{game.players}</div>
            <div className="circle">{game.time}</div>
            <div className="circle">{game.difficulty}</div>
          </div>
        </div>
        {/* Columna derecha: título y descripción */}
        <div className="column-right">
          <h1 className="title-game">{game.title}</h1>
          <div className="description">
            <p>{game.description1}</p>
            <p>{game.description2}</p>
          </div>
        </div>
      </div>
      
      {/* Separador horizontal final */}
      <hr className="separator" />
    </section>
  );
}

export default GameOption;
