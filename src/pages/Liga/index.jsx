import React, { useState, useEffect } from "react";
import { supabase } from "../../Supabase/supabase.js"; 
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { BsTrophyFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import "./style.css";

function Liga() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    equipos: "",
    premio: "",
  });

  const [ligas, setLigas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // 🔹 Obtener ligas desde Supabase
  async function obtenerLigas() {
    const { data, error } = await supabase
      .from("ligas")
      .select("*")
      .order("fechaInicio", { ascending: true });

    if (error) {
      console.error("Error al obtener ligas:", error);
    } else {
      setLigas(data || []);
    }
  }

  useEffect(() => {
    obtenerLigas();
  }, []);

  const openModal = (liga = null) => {
    if (liga) {
      setForm({
        nombre: liga.nombre || "",
        fechaInicio: liga.fechaInicio || "",
        fechaFin: liga.fechaFin || "",
        equipos: liga.equipos || "",
        premio: liga.premio || "",
      });
      setEditingId(liga.id);
    } else {
      setForm({ nombre: "", fechaInicio: "", fechaFin: "", equipos: "", premio: "" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Crear o editar liga
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.nombre || !form.fechaInicio || !form.fechaFin || !form.equipos || !form.premio) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (new Date(form.fechaInicio) > new Date(form.fechaFin)) {
      alert("La fecha de inicio no puede ser posterior a la fecha fin.");
      return;
    }

    const ligaData = {
      nombre: form.nombre,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      equipos: Number(form.equipos),
      premio: form.premio,
      tipo: "Torneo",
      inscripcion: "Inscripción",
    };

    if (editingId) {
      const { error } = await supabase.from("ligas").update(ligaData).eq("id", editingId);
      if (error) alert("Error al actualizar liga");
    } else {
      const { error } = await supabase.from("ligas").insert([ligaData]);
      if (error) alert("Error al crear liga");
    }

    setShowModal(false);
    obtenerLigas();
  }

  // 🔹 Eliminar liga
  async function handleDeleteConfirmed(id) {
    const { error } = await supabase.from("ligas").delete().eq("id", id);
    if (error) console.error("Error al eliminar liga:", error);
    setDeleteCandidate(null);
    obtenerLigas();
  }

  return (
    <>
      <div className="Gestion-Ligas">
        <div className="Gestion">
          <div className="Ligas-sup">
            <div className="Ligas">
              <h1>Ligas</h1>
              <h4 className="sup">Controla ligas y torneos</h4>
            </div>

            <div className="Boton-Nuevo">
              <button type="button" onClick={openModal}>
                + Crear Nuevo
              </button>
            </div>
          </div>

          <div className="Gestion-liga">
            <h1>Gestión de Ligas</h1>
            <h4 className="sub">Administra todas las ligas y torneos </h4>

            <div className="Boton-Liga">
              <button type="button" onClick={openModal}>
                + Nueva Liga
              </button>
            </div>
          </div>

          {/* Listado de ligas */}
          <div className="Cartas-Lista">
            {ligas.map((liga) => (
              <div className="Cartas-U" key={liga.id}>
                <div className="Avatar">
                  <BsTrophyFill />
                </div>
                <div className="Datos">
                  <h3>{liga.nombre}</h3>
                  <p>
                    <CiCalendar /> {liga.fechaInicio} <FaLongArrowAltRight /> {liga.fechaFin}
                  </p>
                  <div className="equipos">
                    <h1 className="equipos-cantidad">{liga.equipos} equipos</h1>
                    <p>{liga.premio}</p>
                  </div>

                  <div className="Actividad">
                    <h4 className="torneo">{liga.tipo}</h4>
                    <h4 className="incripcion">{liga.inscripcion}</h4>
                  </div>
                  <div className="Botones-Cartas">
                    <button className="editar" onClick={() => openModal(liga)}>
                      <HiOutlinePencil /> Editar
                    </button>
                    <button className="basura" onClick={() => setDeleteCandidate(liga)}>
                      <HiTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de creación/edición */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? "Editar liga" : "Crear nueva liga"}</h2>
              <button className="modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="form-modal">
              <div className="form-row">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Fecha inicio</label>
                <input name="fechaInicio" type="date" value={form.fechaInicio} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Fecha fin</label>
                <input name="fechaFin" type="date" value={form.fechaFin} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Equipos</label>
                <input name="equipos" type="number" min="1" value={form.equipos} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label>Premio</label>
                <input name="premio" value={form.premio} onChange={handleChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-submit">
                  {editingId ? "Guardar cambios" : "Crear liga"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {deleteCandidate && (
        <div className="modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar eliminación</h2>
            </div>
            <div style={{ padding: "1rem" }}>
              <p>
                ¿Eliminar <strong>{deleteCandidate.nombre}</strong>?
              </p>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                <button className="btn-cancel" onClick={() => setDeleteCandidate(null)}>
                  Cancelar
                </button>
                <button
                  className="btn-submit"
                  onClick={() => handleDeleteConfirmed(deleteCandidate.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Liga;
