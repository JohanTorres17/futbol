import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { BsTrophyFill } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";

import './style.css';

function Liga () {
  // Estado para el modal y el formulario
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: '',
    equipos: '',
    premio: ''
  });

  // Lista de ligas (inicial con la simulación)
  const [ligas, setLigas] = useState([
    {
      id: 1,
      nombre: 'Liga Premier 2025',
      fechaInicio: '2025-01-15',
      fechaFin: '2025-04-30',
      equipos: 32,
      premio: '$1,000,000',
      tipo: 'Torneo',
      inscripcion: 'Inscripción'
    }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const openModal = (liga = null) => {
    // si se pasa una liga, entramos en modo edición
    if (liga) {
      setForm({
        nombre: liga.nombre || '',
        fechaInicio: liga.fechaInicio || '',
        fechaFin: liga.fechaFin || '',
        equipos: liga.equipos || '',
        premio: liga.premio || ''
      });
      setEditingId(liga.id);
    } else {
      setForm({ nombre: '', fechaInicio: '', fechaFin: '', equipos: '', premio: '' });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación mínima
    if (!form.nombre || !form.fechaInicio || !form.fechaFin || !form.equipos || !form.premio) {
      alert('Por favor completa todos los campos.');
      return;
    }
    if (new Date(form.fechaInicio) > new Date(form.fechaFin)) {
      alert('La fecha de inicio no puede ser posterior a la fecha fin.');
      return;
    }
    if (editingId) {
      // actualizar liga existente
      setLigas(prev => prev.map(l => l.id === editingId ? ({
        ...l,
        nombre: form.nombre,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        equipos: Number(form.equipos),
        premio: form.premio
      }) : l));
      setEditingId(null);
    } else {
      const nuevaLiga = {
        id: Date.now(),
        nombre: form.nombre,
        fechaInicio: form.fechaInicio,
        fechaFin: form.fechaFin,
        equipos: Number(form.equipos),
        premio: form.premio,
        tipo: 'Torneo',
        inscripcion: 'Inscripción'
      };
      setLigas(prev => [nuevaLiga, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (liga) => {
    // abrir modal de confirmación
    setDeleteCandidate({ id: liga.id, nombre: liga.nombre });
  };

  const handleDeleteConfirmed = (id) => {
    setLigas(prev => prev.filter(l => l.id !== id));
    setDeleteCandidate(null);
  };

  return (
    <>
      <div className='Gestion-Ligas'>
        <div className='Gestion'>

          <div className='Ligas-sup'>
            <div className='Ligas'>
              <h1>Ligas</h1>
              <h4 className='sup'>Controla ligas y torneos</h4>
            </div>

            <div className='Boton-Nuevo'>
              <button type="button" onClick={openModal}> + Crear Nuevo</button>
            </div>
          </div>

          <div className='Gestion-liga'>
            <h1>Gestión de Ligas</h1>
            <h4 className='sub'>Administra todos las ligas y torneos </h4>

            <div className='Boton-Liga'>
              <button type="button" onClick={openModal}> + Nueva Liga</button>
            </div>
          </div>

          <div className='busqueda'>
            <input
              type='text'
              placeholder='Buscar ligas..'
            />
          </div>

          {/* Listado de cartas de ligas */}
          <div className='Cartas-Lista'>
            {ligas.map((liga) => (
              <div className='Cartas-U' key={liga.id}>
                <div className='Avatar'> <BsTrophyFill /> </div>
                <div className='Datos'>
                  <h3>{liga.nombre}</h3>
                  <p> <CiCalendar /> {liga.fechaInicio}  <FaLongArrowAltRight />  {liga.fechaFin}</p>
                  <div className='equipos'>
                    <h1 className='equipos-cantidad'>{liga.equipos} equipos</h1>
                    <p>{liga.premio}</p>
                  </div>

                  <div className='Actividad'>
                    <h4 className='torneo'>{liga.tipo}</h4>
                    <h4 className='incripcion'>{liga.inscripcion}</h4>
                  </div>
                  <div className='Botones-Cartas'>
                    <button type="button" className='editar' onClick={() => openModal(liga)}><HiOutlinePencil /> Editar </button>
                    <button type="button" className='basura' onClick={() => handleDelete(liga)}><HiTrash /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal / Panel de creación */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar liga' : 'Crear nueva liga'}</h2>
              <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar modal">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="form-modal">
              <div className="form-row">
                <label>Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre de la liga"
                />
              </div>

              <div className="form-row">
                <label>Fecha inicio</label>
                <input
                  name="fechaInicio"
                  type="date"
                  value={form.fechaInicio}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Fecha fin</label>
                <input
                  name="fechaFin"
                  type="date"
                  value={form.fechaFin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Cantidad de equipos</label>
                <input
                  name="equipos"
                  type="number"
                  min="1"
                  value={form.equipos}
                  onChange={handleChange}
                  placeholder="e.g. 16"
                />
              </div>

              <div className="form-row">
                <label>Premio</label>
                <input
                  name="premio"
                  value={form.premio}
                  onChange={handleChange}
                  placeholder="$1,000,000"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn-submit">{editingId ? 'Guardar cambios' : 'Crear liga'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación para borrar */}
      {deleteCandidate && (
        <div className="modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirmar eliminación</h2>
            </div>
            <div style={{padding: '1rem'}}>
              <p>¿Estás seguro que deseas eliminar <strong>{deleteCandidate.nombre}</strong>?</p>
              <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'flex-end'}}>
                <button type="button" className="btn-cancel" onClick={() => setDeleteCandidate(null)}>Cancelar</button>
                <button type="button" className="btn-submit" onClick={() => handleDeleteConfirmed(deleteCandidate.id)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Liga;