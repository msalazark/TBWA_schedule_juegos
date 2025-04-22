import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReservationScreen.css";
import ReservationForm from "../../components/ReservationForm";


const gamesData = [
  {
    id: 1,
    title: "ESCAPA DE LA CASA DE TUS SUEGROS",
    image: "/game_imagen_suegra.png",
    description1: `Has estado ahorrando durante 5 años para comprar tu propio depa,
      y durante ese tiempo, viste cómo
      vivir con la mamá de tu pareja pasó de ser una linda experiencia 
      a convertirse en una tortura diaria. 
      ¿Tendrás lo que se necesita para al fin poder
      escapar a tiempo de este infierno`,
    description2: "¡Pon a prueba tu ingenio!",
    players: "4",
    time: "30 min",
    difficulty: "3/5",
    backgroundColor: "#3799B7",
    colorTitle: "#F8FF38",
    colorDescription: "#FFFFFF",
    ficha: "/ficha-suegra.png",
    alertarme: 0
  },
  {
    id: 2,
    title: "ESCAPA DE ESE DEPA RATONERA",
    image: "/game_imagen_ratonera.png",
    description1: `Llevas 10 años viviendeo en un depa donde 
    para ir del “cuarto” a la cocina tan solo te demoras un
      segundo, pero por fin lograste ahorrar lo suficiente
      para comprar tu propio depa. ¿Podrás escapar de
      ese espacio de relativo confort para vivir en un
      espacio realmente agradable`,
    description2: "Resuelve pistas y escapa.",
    players: "4",
    time: "30 min",
    difficulty: "4/5",
    backgroundColor: "#642CE7",
    colorTitle: "#50FDFF",
    colorDescription: "#FFFFFF",
    ficha: "/ficha-ratonera.png",
    alertarme: 1
  },
  {
    id: 3,
    title: "ESCAPA DEL EDIFICIO MULTIFAMILIAR",
    image: "/game_imagen_multi.png",
    description1: `Has pasado toda tu vida viviendo con tíos, primos,
                  hermanos de tus abuelos, hijas e hijos de los ex de
                  tus cuñados y cuanto familiar nuevo aparezca y la
                  situación se ha vuelto insostenible ¿Podrás escapar
                  antes de volverte aún más loco(a) de lo que estás?`,
    description2: "Resuelve pistas y escapa.",
    players: "4",
    time: "30 min",
    difficulty: "5/5",
    backgroundColor: "#FEB123",
    colorTitle: "#61226D",
    colorDescription: "#FFFFFF",
    ficha: "/ficha-multi.png",
    alertarme: 1
  }
  // Puedes agregar más juegos aquí...
];

function ReservationScreen({ onBack, juegoId, onSuccess }) {
  // Obtiene los detalles del juego a partir del juegoId
  const gameDetails = gamesData.find((game) => game.id === juegoId) || {};

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

  // Estados para fecha, horario, reservas y datos del formulario
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    distrito: "",
    referencia: ""
  });
  const [sending, setSending] = useState(false);

  // Obtiene todas las reservas desde el backend para el juego y la fecha seleccionados
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!juegoId) return;
        const normalizedDate = new Date(selectedDate);
        normalizedDate.setHours(0, 0, 0, 0);
        const response = await axios.get("http://localhost:5000/api/reservas", {
          params: { fecha: normalizedDate.toISOString(), juegoId }
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };
    fetchReservations();
  }, [selectedDate, juegoId]);

  const reservedTimes = reservations.map((reserva) => reserva.hora);
  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const currentHour = new Date().getHours();

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
    setSelectedTime(null); // Reinicia la selección al cambiar la fecha
  };

  const handleSlotClick = (time) => {
    const hour = parseInt(time.split(":")[0], 10);
    const isPast = isToday && hour <= currentHour;
    if (!reservedTimes.includes(time) && !isPast) {
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

    const fechaObj = new Date(selectedDate);
    fechaObj.setHours(0, 0, 0, 0);
    const reservaData = {
      nombre: formData.name,
      email: formData.email,
      telefono: formData.phone,
      fecha: fechaObj.toISOString(),
      hora: selectedTime,
      juegoId,
    };

    console.log("Enviando reservaData:", reservaData);
    try {
      setSending(true);
      const response = await axios.post("http://localhost:5000/api/reservas", reservaData);
      console.log("Reserva confirmada:", response.data);
      onSuccess( formData.name); // Llama a la función onSuccess pasada como prop
      /*alert("Reserva confirmada: " + response.data.message);*/
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
    <div className="reservation-screen" style={{ backgroundColor: gameDetails.backgroundColor || "#00bfff" }}>
      <div className="left-noise"></div>
      <div className="right-noise"></div>

      {/* Header con logo a la izquierda y botón "Volver" a la derecha */}
      <div className="reservation-header">
        <img src="/logo-barqueros.png" alt="Logo de la empresa" className="header-logo" />
        <button className="header-back-btn" onClick={onBack}>
          Volver
        </button>
      </div>

      <hr className="separator" />

      <div className="reservation-container">
        {/* Columna izquierda: imagen y título del juego */}
        <div className="reservation-left">
          <img src={gameDetails.image} alt="Juego" />
          <h2 className="game-title" style={{ color: gameDetails.colorTitle || "#000" }}>
            {gameDetails.title}
          </h2>
        </div>

        {/* Columna derecha: dropdown, grilla de horarios o formulario */}
        <div className="reservation-right">
          <select className="custom-dropdown" id="dateSelect" onChange={handleDateChange} value={selectedDate.toISOString()}>
            {dates.map((date, idx) => (
              <option key={idx} value={date.toISOString()}>
                {formatDate(date)}
              </option>
            ))}
          </select>

          {!selectedTime ? (
            <>
              <h2 className="schedule-title">HORARIOS DISPONIBLES:</h2>
              <div className="time-slots-grid">
                {timeSlots.map((time, idx) => {
                  const hour = parseInt(time.split(":")[0], 10);
                  const isPast = isToday && hour <= currentHour;
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
            </>
          ) : (
            <ReservationForm
              gameDetails={gameDetails}
              selectedTime={selectedTime}
              formData={formData}
              handleFormChange={handleFormChange}
              handleSubmit={handleSubmit}
              sending={sending}
              onResetTime={() => setSelectedTime(null)} 
            />
          )}

          <div>
            <p>Instrucciones: ¡Máximo 4 participantes! Llegar 15 minutos antes. Solo mayores de edad.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationScreen;
