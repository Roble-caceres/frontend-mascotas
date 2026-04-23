import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Contexto from "./Contexto";

// Componente de login del usuario
function MiLogin() {

  // Obtenemos el token y la función para cambiarlo desde el contexto
  let { token, setToken } = useContext(Contexto);

  // Estados para todos los campos del formulario
  let [usuario, setUsuario] = useState("");
  let [password, setPassword] = useState("");

  // Si ya hay token, redirigimos a la página principal
  return token ? (
    <Navigate to="/" />
  ) : (
    <form
      className="login"
      onSubmit={(evento) => {
        evento.preventDefault();
         
        // Peticion POST para hacer login
        fetch("https://backend-mascotas-5e20.onrender.com", {
          method: "POST",
          body: JSON.stringify({ usuario, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((respuesta) => {
            // Si la resouesta es correcta, convertimos a JSON 
            if (respuesta.status === 200) return respuesta.json();
            throw respuesta.status;
          })
          .then(({ token }) => {
            // Guardamos el usuario en localStorage
            localStorage.setItem("usuario", usuario); 
            // Guardamos el token en el contexto
            setToken(token);
          })
          .catch((error) => {
            console.log("Error login:", error);
          });
      }}
    >
      {/* Input usuario */}
      <input
        type="text"
        value={usuario}
        onChange={(evento) => setUsuario(evento.target.value)}
        placeholder="Usuario"
      />

      {/* Input contraseña */}
      <input
        type="password"
        value={password}
        onChange={(evento) => setPassword(evento.target.value)}
        placeholder="Contraseña"
      />

      {/* Botón login */}
      <button type="submit" className="boton">
        Entrar
      </button>
    </form>
  );
}

export default MiLogin;
