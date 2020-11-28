import React, { Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
  // Crear state de citas
  const [cita, setCita] = useState({
    mascota: "",
    propietario: "",
    supervisor: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const [error, setError] = useState(false);

  //Función que se ejecuta cuando el usuario escribe en un input
  const actualizarState = (e) => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  //Extraer los valores
  const { mascota, propietario, fecha, hora, sintomas, supervisor } = cita;

  //Cuando el usuario presiona agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      supervisor.trim() === "" ||
      sintomas.trim() === ""
    ) {
      setError(true);
      return;
    }

    //Eliminar mensaje previo de error si existe
    setError(false);

    //Asignar un ID
    cita.id = uuid();

    //Crear la cita
    crearCita(cita);

    //Reiniciar el form
    setCita({
      mascota: "",
      propietario: "",
      supervisor: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Registro</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label>Nombre</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre Proyecto</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del proyecto"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Nombre Supervisor</label>
        <input
          type="text"
          name="supervisor"
          className="u-full-width"
          placeholder="Nombre del supervisor"
          onChange={actualizarState}
          value={supervisor}
        />

        <label>Fecha Supervision</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Observaciones</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar cita
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
