import React from "react";

function ReservationScreen({ onBack }) {
  const today = new Date();
  // Genera un array con hoy y los próximos 7 días
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const formatDate = (date) => date.toLocaleDateString();

  // Genera intervalos de 45 minutos (por ejemplo, de 9:00 a 21:00)
  const startTime = 9 * 60; // en minutos (9:00)
  const endTime = 21 * 60;  // en minutos (21:00)
  const timeSlots = [];
  for (let t = startTime; t <= endTime; t += 45) {
    const hour = Math.floor(t / 60);
    const minute = t % 60;
    timeSlots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );
  }

  return (
    <div className="reservation-screen">
      <h1>Reserva</h1>
      <label htmlFor="dateSelect">Selecciona una fecha:</label>
      <select id="dateSelect">
        {dates.map((date, idx) => (
          <option key={idx} value={date.toISOString()}>
            {formatDate(date)}
          </option>
        ))}
      </select>
      <div className="time-slots">
        {timeSlots.map((time, idx) => (
          <button key={idx} className="time-slot">
            {time}
          </button>
        ))}
      </div>
      <button className="back-btn" onClick={onBack}>
        Volver
      </button>
    </div>
  );
}

export default ReservationScreen;
