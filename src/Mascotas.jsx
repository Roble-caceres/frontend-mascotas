import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contexto from "./Contexto";
import App from "./App";
import MiLogin from "./MiLogin";

// Definimos las rutas de la aplicación
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <MiLogin />,
  },
]);

// Componente principal que gestiona el token y el router
function Mascotas() {

  // Estado para guardar el token (lo cogemos de localStorage si existe)
  let [token, setToken] = useState(localStorage.getItem("token"));

  // Guardamos o eliminamos el token en localStorage cuando cambia
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    // Compartimos el token y la función para cambiarlo en toda la app
    <Contexto.Provider value={{ token, setToken }}>
      <RouterProvider router={router} />
    </Contexto.Provider>
  );
}

export default Mascotas;
