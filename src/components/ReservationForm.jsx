import React from "react";
import "./ReservationForm.css";

const ReservationForm = ({
  gameDetails = {},
  selectedTime,
  formData,
  handleFormChange,
  handleSubmit,
  sending,
  onResetTime,       // <-- prop añadida
}) => {
  return (
    <div className="reservation-form-container">
      {/* Encabezado del formulario con información del juego */} 
      <div className="reservation-form-header">
        <div className="game-details">
          {/* Ahora el selectedTime es clickable */}
          <div
            className="selected-time"
            onClick={onResetTime}
            style={{ cursor: "pointer" }}
            title="Volver a elegir fecha y hora"
          >
            <strong>Horario:</strong> {selectedTime} &nbsp;
            <span className="change-time">(cambiar)</span>
          </div>
        </div>
      </div>

      <h2 className="schedule-title">COMPLETA TUS DATOS</h2>
      <form onSubmit={handleSubmit} className="registration-form-grid">
        <div className="form-column">
          <input
            type="text"
            name="name"
            placeholder="Nombre y apellido"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Whatsapp"
            value={formData.phone}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="form-column">
          <input
            type="text"
            name="distrito"
            placeholder="Distrito"
            value={formData.distrito || ""}
            onChange={handleFormChange}
            required
          />
          <input
            type="text"
            name="referencia"
            placeholder="Referencia"
            value={formData.referencia || ""}
            onChange={handleFormChange}
            required
          />
        </div>
        <button
            type="submit"
            className="reserve-btn"
            disabled={sending}
          >
            {sending ? "Enviando..." : "CONFIRMA RESERVA"}
          </button>
      </form>
    </div>
  );
};

export default ReservationForm;
