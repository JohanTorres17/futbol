import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { RiTShirtLine } from "react-icons/ri";

import './style.css'

function Gestion_jugador () {
     const [showModal, setShowModal] = useState(false);
     const [form, setForm] = useState({ nombre: '', posicion: '', edad: '', estadisticas: '', equipo: '', precio: '' });
     const [jugadores, setJugadores] = useState([
        { id: 1, nombre: 'Lionel Messi', posicion: 'Delantero', edad: 36, estadisticas: 'Goles: 2', equipo: 'FC Barcelona', precio: '$50,000,000', activo: true }
     ]);
     const [editingId, setEditingId] = useState(null);
     const [deleteCandidate, setDeleteCandidate] = useState(null); // { id, nombre }

     const openModal = (jugador = null) => {
        if (jugador) {
           setForm({
             nombre: jugador.nombre || '',
             posicion: jugador.posicion || '',
             edad: jugador.edad || '',
             estadisticas: jugador.estadisticas || '',
             equipo: jugador.equipo || '',
             precio: jugador.precio || ''
           });
           setEditingId(jugador.id);
        } else {
           setForm({ nombre: '', posicion: '', edad: '', estadisticas: '', equipo: '', precio: '' });
           setEditingId(null);
        }
        setShowModal(true);
     };
     const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
     };

     const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre || !form.posicion || !form.edad || !form.equipo) {
           alert('Por favor completa los campos obligatorios.');
           return;
        }
        if (editingId) {
           // actualizar
           setJugadores(prev => prev.map(j => j.id === editingId ? ({
             ...j,
             nombre: form.nombre,
             posicion: form.posicion,
             edad: Number(form.edad),
             estadisticas: form.estadisticas,
             equipo: form.equipo,
             precio: form.precio
           }) : j));
           setEditingId(null);
        } else {
           // crear
           const nuevo = {
              id: Date.now(),
              nombre: form.nombre,
              posicion: form.posicion,
              edad: Number(form.edad),
              estadisticas: form.estadisticas,
              equipo: form.equipo,
              precio: form.precio,
              activo: true
           };
           setJugadores(prev => [nuevo, ...prev]);
        }
        setShowModal(false);
     };

     const handleDeleteConfirmed = (id) => {
        setJugadores(prev => prev.filter(j => j.id !== id));
        setDeleteCandidate(null);
     };

     const handleDelete = (j) => {
        // abrir modal de confirmación, no usar confirm()
        setDeleteCandidate({ id: j.id, nombre: j.nombre });
     };

     return(
        <>
   <div className='Gestion_jugadores'> 
      <div className='Gestion'>

         <div className='Jugadores-sup'>
            <div className='Jugadores'> 
               <h1>Jugadores</h1>
               <h4 className='sup'>Administra jugadores resgistrados</h4>
            </div>

            <div className='Boton-Nuevo'>
               <button type="button" onClick={openModal}> + Crear Nuevo</button>
            </div>  
         </div>

        <div className='Gestion-jugador'>
            <h1>Gestión de Jugadors</h1>
            <h4 className='sub'>Administra todos los jugadores registrados </h4>

            <div className='Boton-Jugador'>
               <button type="button" onClick={openModal}> + Nuevo Jugador</button>
            </div>   
        </div>

        <div className='busqueda'>
         <input
            type='text'
            placeholder='Buscar usuarios por nombre o email..'
         />
        </div>

            <div className='Cartas-List'>
                      {jugadores.map(j => (
                         <div className='Cartas-U' key={j.id}>
                            <div className='Avatar'>{j.nombre.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                            <div className='Datos'>
                               <h3>{j.nombre}</h3>
                               <p>{j.equipo}</p>
                               <p>{j.edad}</p>
                               <div className='Actividad'>
                                    <h4 className='rol'><RiTShirtLine />  {j.posicion}</h4>
                                    <h4 className='Tiempo-activo'>{j.activo ? 'Activo' : 'Inactivo'}</h4>
                               </div>
                               <p>{j.estadisticas}</p>
                               <p>Precio: {j.precio}</p>
                               <div className='Botones-Cartas'> 
                                    <button className='editar' onClick={() => openModal(j)}><HiOutlinePencil /> Editar </button>
                                    <button className='basura' onClick={() => handleDelete(j)}><HiTrash /></button>
                               </div>
                            </div>
                         </div>
                      ))}
            </div>

      </div> 
   </div>

   {showModal && (
     <div className="modal-overlay" onClick={closeModal}>
       <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
         <div className="modal-header">
                  <h2>{editingId ? 'Editar jugador' : 'Crear nuevo jugador'}</h2>
           <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar modal">✕</button>
         </div>
         <form onSubmit={handleSubmit} className="form-modal">
           <div className="form-row">
             <label>Nombre</label>
             <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" />
           </div>
           <div className="form-row">
             <label>Posición</label>
             <input name="posicion" value={form.posicion} onChange={handleChange} placeholder="Delantero, Defensa..." />
           </div>
           <div className="form-row">
             <label>Edad</label>
             <input name="edad" type="number" min="1" value={form.edad} onChange={handleChange} placeholder="e.g. 25" />
           </div>
           <div className="form-row">
             <label>Estadísticas</label>
             <input name="estadisticas" value={form.estadisticas} onChange={handleChange} placeholder="Goles, asistencias..." />
           </div>
           <div className="form-row">
             <label>Equipo</label>
             <input name="equipo" value={form.equipo} onChange={handleChange} placeholder="Equipo actual" />
           </div>
           <div className="form-row">
             <label>Precio</label>
             <input name="precio" value={form.precio} onChange={handleChange} placeholder="$1,000,000" />
           </div>
           <div className="modal-actions">
             <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
                   <button type="submit" className="btn-submit">{editingId ? 'Guardar cambios' : 'Crear jugador'}</button>
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

export default Gestion_jugador;