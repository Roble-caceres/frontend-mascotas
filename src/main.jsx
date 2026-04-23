import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Mascotas from "./Mascotas.jsx";

// Punto de entrada de la aplicación React
// Aquí se renderiza el componente principal en el div con id "root"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mascotas />
  </StrictMode>,
);