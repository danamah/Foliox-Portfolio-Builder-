// src/App.jsx
import { Bounce, ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import HeroPage from "./components/HeroPage/HeroPage";
import { useState } from "react";
import PortfolioBuilder from "./components/PortfolioBuilder/PortfolioBuilder";


function App() {
  const [view, setView] = useState("hero"); // "hero" | "builder"

  return (
    <>
      {view === "hero" ? (
        <>
          <Navbar onCreateClick={() => setView("builder")} />
          <HeroPage onCreateClick={() => setView("builder")} />
        </>
      ) : (
        <>
          <Navbar onCreateClick={() => setView("builder")} />
          <PortfolioBuilder />
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;