import React, { useState } from "react";
import PresentationScreen from "./pages/presentation/PresentationScreen";
import GameOption from "./components/GameOption";
import ReservationScreen from "./pages/reservation/ReservationScreen";
import AnimatedSection from "./animations/AnimatedSection";
import { AnimatePresence, motion } from "framer-motion";
import ThankYouScreen from "./components/ThankYouScreen";


import "./App.css";

function App() {
  const [showPresentation, setShowPresentation] = useState(true);
  const [reservationMode, setReservationMode] = useState(false);
  const [selectedJuegoId, setSelectedJuegoId] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false); 
  const [thankYouData, setThankYouData] = useState({
    userName: "",
    gameDetails: {}
  });
  

  const games = [
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
      ficha:"/ficha-suegra.png",
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
      ficha:"/ficha-ratonera.png",
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
        ficha:"/ficha-multi.png",
        alertarme: 1
      },
    // Puedes agregar más juegos aquí...
  ];

  const handleContinue = () => {
    setShowPresentation(false);
  };

  const handleReserve = (gameId) => {
    // Aquí podrías guardar el id del juego reservado si lo necesitas
    setSelectedJuegoId(gameId);
    setReservationMode(true);
  };

  const handleBack = () => {
    setReservationMode(false);
  };

  // Llamarás a esto tras completar reserva o suscripción:
  const handleShowThankYou = (userName) => {
    // setShowThankYou(true);
    const game = games.find(g => g.id === selectedJuegoId);
    setThankYouData({ userName, gameDetails: game });
    // Opcional: resetear otros estados si quieres volver al inicio
    setShowThankYou(true);
    //setShowPresentation(false);
    setReservationMode(false);
  };


  const handleExitToHome = () => {
    setShowThankYou(false);
    setShowPresentation(true);
    setReservationMode(false);
    setSelectedJuegoId(null);
  };
  
  /*
  const handleBackHome = () => {
    // Volver al inicio desde “Gracias”
    
    setShowThankYou(false);
    setShowPresentation(true);
  };
  */

  return (
    <div className="app">
      <AnimatePresence exitBeforeEnter>
        {showThankYou ? (
          // 1) Si showThankYou=true, mostramos la pantalla de gracias
          <motion.div
            key="thankyou"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ThankYouScreen 
              userName={thankYouData.userName}
              gameDetails={thankYouData.gameDetails}
              onExit={handleExitToHome}
              //onBackHome={handleBackHome} 
            />
          </motion.div>

        ) : showPresentation ? (
          // 2) Pantalla de presentación
          <motion.div
            key="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PresentationScreen onContinue={handleContinue} />
          </motion.div>

        ) : reservationMode ? (
          // 3) Pantalla de reserva
          <motion.div
            key="reservation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Pasa handleShowThankYou a ReservationScreen */}
            <ReservationScreen
              onBack={handleBack}
              juegoId={selectedJuegoId}
              onSuccess={handleShowThankYou}
            />
          </motion.div>

        ) : (
          // 4) Listado de GameOption
          games.map((game) => (
            <AnimatedSection key={game.id}>
              <div className="left-noise"></div>
              <div className="right-noise"></div>
              <GameOption
                game={game}
                onReserve={handleReserve}
                backgroundColor={game.backgroundColor}
                colorTitle={game.colorTitle}
                colorDescription={game.colorDescription}
                alertarme={game.alertarme}
                onSuccess={handleShowThankYou}   // y a GameOption si hace subscribe
              />
            </AnimatedSection>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;