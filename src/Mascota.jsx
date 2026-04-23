import { useState } from "react";

// Componente que muestra una mascota y permite editarla o borarla
function Mascota({
  id,
  nombre,
  tipo,
  edad,
  vacunas,
  alergias,
  notas,
  borrarMascota,
  actualizarMascota,
}) {

  // Estado para saber si estamos en modo edicion
  let [editando, setEditando] = useState(false);

  // Estados para los inputs al editar
  let [inputNombre, setInputNombre] = useState(nombre);
  let [inputTipo, setInputTipo] = useState(tipo);
  let [inputEdad, setInputEdad] = useState(edad);
  let [inputVacunas, setInputVacunas] = useState(vacunas);
  let [inputAlergias, setInputAlergias] = useState(alergias);
  let [inputNotas, setInputNotas] = useState(notas);

  return (
    <li className="card">
      {editando ? (

        // MODO EDICIÓN
        <div className="editando">
          <input
            placeholder="Nombre"
            value={inputNombre}
            onChange={(e) => setInputNombre(e.target.value)}
          />

          <select
            value={inputTipo}
            onChange={(e) => setInputTipo(e.target.value)}
          >
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="ave">Ave</option>
            <option value="conejo">Conejo</option>
          </select>

          <input
            type="number"
            placeholder="Edad"
            value={inputEdad}
            onChange={(e) => setInputEdad(e.target.value)}
          />

          <input
            placeholder="Vacunas"
            value={inputVacunas}
            onChange={(e) => setInputVacunas(e.target.value)}
          />

          <input
            placeholder="Alergias"
            value={inputAlergias}
            onChange={(e) => setInputAlergias(e.target.value)}
          />

          <input
            placeholder="Notas"
            value={inputNotas}
            onChange={(e) => setInputNotas(e.target.value)}
          />
          {/* Guardar cambios */}
          <button
            onClick={() => {
              actualizarMascota(id, {
                nombre: inputNombre,
                tipo: inputTipo,
                edad: inputEdad,
                vacunas: inputVacunas,
                alergias: inputAlergias,
                notas: inputNotas,
              });
              setEditando(false);
            }}
          >
            Guardar
          </button>

           {/* Cancelar edición */}
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </div>
      ) : (
        // MODO NORMAL
        <div className="contenido-card">
          <div className="fila-superior">

            {/* Avatar con la inicial del nombre */}
            <div className="info-nombre">
              <div className="avatar">{nombre.charAt(0)}</div>
              <h3>{nombre}</h3>
            </div>

            {/* Tipo de mascota con icono */}
            <div className="tipo-con-icono">
              <img
                src={`/icons/${tipo.toLowerCase()}.png`}
                alt={tipo}
                className="icono-tipo"
              />
              <span className="tipo-mascota">{tipo}</span>
            </div>
          </div>

          {/* Edad */}
          <div className="edad-mascota">{edad} años</div>

          <div className="datos-mascota">
            <p>💉 Vacunas: {vacunas || "Sin vacunas"}</p>
            <p>⚠️ Alergias: {alergias || "Sin alergias"}</p>
            <p>📝 Notas: {notas || "Sin notas"}</p>
          </div>
          
           {/* Botones de acción */}
          <div className="botones">
            <button onClick={() => setEditando(true)}>Editar</button>

            <button onClick={() => borrarMascota(id)}>Borrar</button>

            <button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/veterinario+cerca+de+mi",
                  "_blank",
                )
              }
            >
              Veterinario
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Mascota;
