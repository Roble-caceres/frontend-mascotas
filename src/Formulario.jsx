import { useState, useContext } from "react";
import Contexto from "./Contexto";

// Componente que muestra el formulario para crear una nueva mascota 
function Formulario({ crearMascota }) {

  //obtenemos el token del usuario desde el contexto
  let { token } = useContext(Contexto);

  // Estados para los campos del formulario
  let [nombre, setNombre] = useState("");
  let [tipo, setTipo] = useState("");
  let [edad, setEdad] = useState("");
  let [vacunas, setVacunas] = useState("");
  let [alergias, setAlergias] = useState("");
  let [notas, setNotas] = useState("");

  return (
    <form
      className="form-mascota"
      onSubmit={(evento) => {
        evento.preventDefault();

        // Vlidamos que los campos obligatorios esten rellenos 
        if (!nombre || !tipo || !edad) return;

        // Peticion POST  para crear una nueva mascota 
        fetch("https://backend-mascotas-5e20.onrender.com", {
          method: "POST",
          body: JSON.stringify({
            nombre,
            tipo,
            edad,
            vacunas,
            alergias,
            notas,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((respuesta) => respuesta.json())
          .then(({ id }) => {
            // Añadimos la nueva mascota al estado del componente padre 
            crearMascota({
              _id: id,
              nombre,
              tipo,
              edad,
              vacunas,
              alergias,
              notas,
            });
            // Limpiamos los campos del formulario
            setNombre("");
            setTipo("");
            setEdad("");
            setVacunas("");
            setAlergias("");
            setNotas("");
          });
      }}
    >
      { /* Input nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
      />

      {/* Selector de tipo de mascota */}
      <select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
        <option value="">Selecciona tipo</option>
        <option value="perro"> Perro</option>
        <option value="gato"> Gato</option>
        <option value="ave"> Ave</option>
        <option value="conejo"> Conejo</option>
      </select>

       { /* Input edad */}
      <input
        type="number"
        placeholder="Edad"
        value={edad}
        onChange={(evento) => setEdad(evento.target.value)}
      />

      {/* Campos adicionales */}
      <input
        type="text"
        placeholder="Vacunas"
        value={vacunas}
        onChange={(evento) => setVacunas(evento.target.value)}
      />

      <input
        type="text"
        placeholder="Alergias"
        value={alergias}
        onChange={(evento) => setAlergias(evento.target.value)}
      />

      <input
        type="text"
        placeholder="Notas"
        value={notas}
        onChange={(evento) => setNotas(evento.target.value)}
      />
      
      {/* Bton de envio */}
      <button className="boton">Crear mascota</button>
    </form>
  );
}

export default Formulario;
