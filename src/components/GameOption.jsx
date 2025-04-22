import React, { useState } from "react";
import axios from "axios";
import "./GameOption.css"; // Asegúrate de importar tu CSS

function GameOption({
  game,
  onReserve,
  backgroundColor,
  colorTitle,
  colorDescription,
  alertarme
}) {
  // Estados para suscripción
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const [sendingSubscribe, setSendingSubscribe] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribeClick = () => {
    setShowSubscribe(true);
    setError("");
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingresa un email válido");
      return;
    }
    setSendingSubscribe(true);
    try {
      await axios.post("http://localhost:5000/api/subscribe", {
        gameId: game.id,
        email: email.trim()
      });
      setSubscribed(true);
    } catch (err) {
      console.error(err);
      setError("Error al suscribirse. Intenta de nuevo.");
    } finally {
      setSendingSubscribe(false);
    }
  };

  const isSubscribeOnly = alertarme === 1;

  return (
    <section
      className="game-option"
      style={{ backgroundColor }}
    >
      {/* Header con logo y botón de reserva */}
      <div className="game-header">
        <img
          src="/logo-barqueros.png"
          alt="Logo de la empresa"
          className="game-logo"
        />
        <button
          className="reserve-btn"
          onClick={() => !isSubscribeOnly && onReserve(game.id)}
          disabled={isSubscribeOnly}
          title={
            isSubscribeOnly
              ? "Este juego sólo acepta suscripción"
              : "Reservar ahora"
          }
        >
          RESERVA
        </button>
      </div>

      <hr className="separator" />

      <div className="game-columns">
        {/* Columna izquierda */}
        <div className="column-left">
          <img
            src={game.image}
            alt={game.title}
            className="game-photo"
          />
          <div className="game-data">
            <img
              src={game.ficha}
              alt={`${game.title} ficha`}
              className="ficha"
            />
          </div>
        </div>

        {/* Columna derecha: título, descripción y lógica de suscripción */}
        <div className="column-right">
          <h1 className="title-game" style={{ color: colorTitle }}>
            {game.title}
          </h1>
          <div
            className="description"
            style={{ color: colorDescription }}
          >
            <p>{game.description1}</p>
            <p>{game.description2}</p>

            {isSubscribeOnly ? (
              <>
                {!showSubscribe && !subscribed && (
                  <button
                    className="reserve-btn-game"
                    onClick={handleSubscribeClick}
                  >
                    Avísame cuando esté disponible
                  </button>
                )}

                {showSubscribe && !subscribed && (
                  <form
                    className="subscribe-form"
                    onSubmit={handleSubscribeSubmit}
                  >
                    <input
                      type="email"
                      placeholder="Tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="subscribe-btn"
                      disabled={sendingSubscribe}
                    >
                      {sendingSubscribe ? "Enviando..." : "Enviar"}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                  </form>
                )}

                {subscribed && (
                  <p className="thanks-text">
                    ¡Gracias! Te avisaremos cuando abra.
                  </p>
                )}
              </>
            ) : (
              <button
                className="reserve-btn-game"
                onClick={() => onReserve(game.id)}
              >
                Reserva gratis
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GameOption;
