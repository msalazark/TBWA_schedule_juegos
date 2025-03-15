import React from "react";

function GameOption({ game, onReserve }) {
  return (
    <section className="game-option">
      <div className="game-columns">
        {/* Columna Izquierda: Imagen y características */}
        <div className="column-left">
          <img src={game.image} alt={game.title} className="game-photo" />
          <div className="game-data">
            <div className="circle">{game.players}</div>
            <div className="circle">{game.time}</div>
            <div className="circle">{game.difficulty}</div>
          </div>
        </div>
        {/* Columna Derecha: Título y descripción */}
        <div className="column-right">
          <h1>{game.title}</h1>
          <div className="description">
            <p>{game.description1}</p>
            <p>{game.description2}</p>
          </div>
        </div>
      </div>
      {/* Botón de reserva en la esquina inferior derecha */}
      <button className="reserve-btn" onClick={() => onReserve(game.id)}>
        Reservar
      </button>
      {/* Logo en la esquina inferior izquierda */}
      <img src="/logo-barqueros.png" alt="Logo de la empresa" className="game-logo" />
    </section>
  );
}

export default GameOption;
