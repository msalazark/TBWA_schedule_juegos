import React, { useState } from "react";
import PresentationScreen from "./PresentationScreen";
import GameOption from "./GameOption";
import ReservationScreen from "./ReservationScreen";
import "./App.css";


function App() {
  const [showPresentation, setShowPresentation] = useState(true);
  const [reservationMode, setReservationMode] = useState(false);
  
  

  const games = [
    {
      id: 1,
      title: "Escapa de la Casa de tu Suegra",
      image: "https://picsum.photos/400/400?random=1",
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
    },
    {
      id: 2,
      title: "Escapa de ese Depa Ratonera",
      image: "https://picsum.photos/400/400?random=2",
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
    },
    {
        id: 3,
        title: "Escapa del edificio Multifamiliar",
        image: "https://picsum.photos/400/400?random=3",
        description1: `Has pasado toda tu vida viviendo con tíos, primos,
                    hermanos de tus abuelos, hijas e hijos de los ex de
                    tus cuñados y cuanto familiar nuevo aparezca y la
                    situación se ha vuelto insostenible ¿Podrás escapar
                    antes de volverte aún más loco(a) de lo que estás?`,
        description2: "Resuelve pistas y escapa.",
        players: "4",
        time: "30 min",
        difficulty: "5/5",
      },
    // Puedes agregar más juegos aquí...
  ];

  const handleReserve = (gameId) => {
    // Aquí podrías guardar el id del juego reservado si lo necesitas
    setReservationMode(true);
  };

  const handleBack = () => {
    setReservationMode(false);
  };

  const handleContinue = () => {
    setShowPresentation(false);
  };

  return (
    <div className="app">
      {showPresentation ? (
        <PresentationScreen onContinue={handleContinue} />
      ) : reservationMode ? (
        <ReservationScreen onBack={handleBack} />
      ) : (
        games.map((game) => (
          <GameOption key={game.id} game={game} onReserve={handleReserve} />
        ))
      )}
    </div>
  );
}

export default App;
