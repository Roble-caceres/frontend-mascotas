import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Contexto from "./Contexto";
import Mascota from "./Mascota";
import Formulario from "./Formulario";

//Componente principal de la aplicación
function App() {

  //Obtenemos el token y la funcion para modificarlo desde el contexto
  let { token, setToken } = useContext(Contexto);

  //Estados principales de la app
  let [mascotas, setMascotas] = useState([]);
  let [busqueda, setBusqueda] = useState("");
  let [mostrarFormulario, setMostrarFormulario] = useState(false);
  let [pantalla, setPantalla] = useState("inicio");

  // UseEffect para obtener las mascotas cuando hay token
  useEffect(() => {
    // Si no hay token, no hacemos la peticion 
    if (!token) return;

    // Petición GET al backend para obtener las mascotas
    fetch("http://localhost:3000/mascotas", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((respuesta) => respuesta.json())
      .then((datos) => setMascotas(datos));
  }, [token]);

  // Añade una mascota al estado (cuando se crea)
  function crearMascota(mascota) {
    setMascotas([...mascotas, mascota]);
  }
  // Borra una mascota por id
  function borrarMascota(id) {
    fetch("http://localhost:3000/borrar/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      // Actualizamos el estado eliminando la mascota 
      setMascotas(mascotas.filter((m) => m._id !== id));
    });
  }
  // Actualiza los datos de una mascota
  function actualizarMascota(id, objMascota) {
    fetch("http://localhost:3000/actualizar/" + id, {
      method: "PATCH",
      body: JSON.stringify(objMascota),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() => {
      // Actualizamos el estado con los nuevos datos
      setMascotas(
        mascotas.map((m) => (m._id === id ? { ...m, ...objMascota } : m)),
      );
    });
  }
  // Cierra sesión eliminando el token y las mascotas
  function cerrarSesion() {
    setMascotas([]);
    setToken(null);
  }
  // Si no hay token, redirige al login
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div className="app">
      <div className="barra-lateral">
        <h3>🐾 Mascotas</h3>

        <div className="menu">
          {/* Cambia de pantalla */}
          <button onClick={() => setPantalla("inicio")}>Inicio</button>
          <button onClick={() => setPantalla("mascotas")}>Mis mascotas</button>
          <button onClick={() => setMostrarFormulario(true)}>
            Nueva mascota
          </button>
        </div>

        <div className="menu">
          <button onClick={() => setPantalla("ajustes")}>⚙️ Ajustes</button>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      </div>

      <div className="contenido">
        <div className="contenedor">
          <div className="cabecera"></div>

          {/* MODAL para crear mascota */}
          {mostrarFormulario && (
            <div
              className="fondo-modal"
              onClick={() => setMostrarFormulario(false)}
            >
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="cerrar-modal"
                  onClick={() => setMostrarFormulario(false)}
                >
                  X
                </button>

                <Formulario crearMascota={crearMascota} />
              </div>
            </div>
          )}

          {/* PANTALLA INICIO */}
          {pantalla === "inicio" && (
            <div className="inicio">
              <h2 className="titulo-bienvenida">
                Hola {localStorage.getItem("usuario") || "Usuario"}
              </h2>
              <div className="imagen-inicio">
                <h1>Cuida de tus mascotas</h1>
                <p>Todo lo que necesitan en un solo lugar</p>
              </div>

              {/* Servicios informativos */}
              <div className="servicios">
                <div className="servicio">
                  <p>Guardería</p>
                  <span>Cuidado diario para tu mascota</span>
                  <small>📍 Calle Mayor 10</small>
                  <small>📞 123 456 789</small>
                </div>

                <div className="servicio">
                  <p>Peluquería</p>
                  <span>Baño, corte y limpieza</span>
                  <small>📍 Av. Central 22</small>
                  <small>📞 987 654 321</small>
                </div>

                <div className="servicio">
                  <p>Tienda</p>
                  <span>Alimentos y accesorios</span>
                  <small>📍 Calle Comercio 5</small>
                  <small>📞 654 321 987</small>
                </div>
              </div>
            </div>
          )}
          {/*  PANTALL MASCOTAS */}
          {pantalla === "mascotas" && (
            <div className="panel">
              <h2>Mis mascotas</h2>
              <div className="panel-principal">
                <div className="caja buscador-con-boton">
                  <input
                    className="buscador"
                    type="text"
                    placeholder="🔍 Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <button
                    className="boton"
                    onClick={() => setMostrarFormulario(true)}
                  >
                    + Crear mascota
                  </button>
                </div>

                {/* Lista de mascotas filtradas */}
                <ul className="lista-mascotas">
                  {mascotas
                    .filter((m) =>
                      m.nombre.toLowerCase().includes(busqueda.toLowerCase()),
                    )
                    .map((m) => (
                      <Mascota
                        key={m._id}
                        id={m._id}
                        {...m}
                        borrarMascota={borrarMascota}
                        actualizarMascota={actualizarMascota}
                      />
                    ))}
                </ul>
              </div>
            </div>
          )}

          {/* PANTALLA AJUSTES */}
          {pantalla === "ajustes" && (
            <div className="inicio">
              <h3>Ajustes</h3>

              <div className="panel">
                <div className="caja">
                  <p>Usuario</p>
                  <h2>Conectado</h2>
                </div>

                <div className="caja">
                  <p>Total mascotas</p>
                  <h2>{mascotas.length}</h2>
                </div>

                <div className="caja">
                  <p>App</p>
                  <h2>Gestor mascotas</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
