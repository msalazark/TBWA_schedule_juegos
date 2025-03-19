import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReservationScreen.css";

function ReservationScreen({ onBack, juegoId }) {

  const today = new Date();
  // Genera un array con hoy y los próximos 7 días
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const formatDate = (date) => date.toLocaleDateString();

  // Genera 18 horarios, empezando a las 9:00 (intervalo de 1 hora)
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    let hour = 9 + i;
    if (hour >= 24) hour -= 24;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  // Estados para fecha, horario y datos del formulario
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservations, setReservations] = useState([]); // Reservas ya existentes para la fecha y juego
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [sending, setSending] = useState(false);

  // const [reservas, setReservas] = useState([]);
  // const [reservedSlots, setReservedSlots] = useState([]);

  // Obtiene todas las reservas desde el backend para el juego (puedes optimizar creando un endpoint específico)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Si no hay juegoId, no hacemos la consulta
        if (!juegoId) return;

        const normalizedDate = new Date(selectedDate);
        normalizedDate.setHours(0, 0, 0, 0);

        const response = await axios.get("http://localhost:5000/api/reservas", {
          params: {
            fecha: normalizedDate.toISOString(),
            juegoId: juegoId
          }
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservations();
  }, [selectedDate, juegoId]);

  // Extrae los horarios reservados
  const reservedTimes = reservations.map((reserva) => reserva.hora);

  // Determina si la fecha seleccionada es hoy
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const currentHour = new Date().getHours();


  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedTime(null); // Reinicia el horario seleccionado al cambiar la fecha
  };

  const handleSlotClick = (time) => {
    // Solo permite seleccionar si el botón no está marcado como reservado o pasado
    if (!reservedTimes.includes(time)) {
      // Si es hoy, solo permite horas mayores a la hora actual
      if (isToday && parseInt(time.split(":")[0], 10) <= currentHour) return;
      setSelectedTime(time);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTime) {
      console.error("No se ha seleccionado un horario");
      return;
    }

    // Normaliza la fecha para registrar solo la parte de la fecha (00:00)
    const fechaObj = new Date(selectedDate);
    fechaObj.setHours(0, 0, 0, 0);

    const reservaData = {
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone,
      fecha: fechaObj.toISOString(),  // Envia la fecha completa (solo la parte de la fecha)
      hora: selectedTime,                  // Envia la hora en formato "HH:MM"
      juegoId,                           // ID del juego (número, según tu payload)
    };

    console.log("Enviando reservaData:", reservaData);

    try {
      setSending(true);
      const response = await axios.post("http://localhost:5000/api/reservas", reservaData);
      console.log("Reserva confirmada:", response.data);
      alert("Reserva confirmada: " + response.data.message);
    } catch (error) {
      console.error(
        "Error al crear la reserva:",
        error.response?.data?.message || error.message
      );
      alert(
        "Error al crear la reserva: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="reservation-screen">
      <div className="reservation-container">
        {/* Columna izquierda: imagen */}
        <div className="reservation-left">
          <img src="https://picsum.photos/400/600" alt="Reserva" />
        </div>
        {/* Columna derecha: dropdown, grilla de horarios o formulario */}
        <div className="reservation-right">
          <select
            id="dateSelect"
            onChange={handleDateChange}
            value={selectedDate.toISOString()}
          >
            {dates.map((date, idx) => (
              <option key={idx} value={date.toISOString()}>
                {formatDate(date)}
              </option>
            ))}
          </select>
          <h2>Horarios disponibles</h2>
          {!selectedTime ? (
            <div className="time-slots-grid">
              {timeSlots.map((time, idx) => {
                // Para el día de hoy, deshabilita horarios anteriores o iguales a la hora actual
                const isPast = isToday && parseInt(time.split(":")[0], 10) <= currentHour;
                // Si la fecha es futura, aplica otro estilo para los reservados
                const reservedClass = reservedTimes.includes(time)
                  ? (isToday ? "reserved" : "reserved-future")
                  : "";
                return (
                  <button
                    key={idx}
                    className={`time-slot ${reservedClass} ${isPast ? "past" : ""}`}
                    onClick={() => handleSlotClick(time)}
                    disabled={reservedTimes.includes(time) || isPast}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="registration-form">
              <h3>Registrar Reserva para {selectedTime}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
                <button type="submit" className="confirm-btn" disabled={sending}>
                  {sending ? "Enviando..." : "Confirmar Reserva"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <button className="back-btn" onClick={onBack}>
        Volver
      </button>
    </div>
  );


} 

export default ReservationScreen;
