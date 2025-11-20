import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { RiTShirtLine } from "react-icons/ri";
import { supabase } from '../../database/supabase';

import './style.css'

function Gestion_jugador () {
     const [showModal, setShowModal] = useState(false);
     const [form, setForm] = useState({ nombre: '', posicion: '', edad: '', estadisticas: '', equipo: '', precio: '' });
     const [jugadores, setJugadores] = useState([]);
     const [editingId, setEditingId] = useState(null);
     const [deleteCandidate, setDeleteCandidate] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     // Cargar jugadores al montar el componente
     useEffect(() => {
        fetchJugadores();
     }, []);

     const fetchJugadores = async () => {
        try {
           setLoading(true);
           const { data, error } = await supabase
              .from('jugadores')
              .select('*')
              .order('created_at', { ascending: false });
           
           if (error) throw error;
           setJugadores(data || []);
           setError(null);
        } catch (err) {
           setError(err.message);
           console.error('Error cargando jugadores:', err);
        } finally {
           setLoading(false);
        }
     };

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

     const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nombre || !form.posicion || !form.edad || !form.equipo) {
           alert('Por favor completa los campos obligatorios.');
           return;
        }

        try {
           if (editingId) {
              // Actualizar jugador
              const { error } = await supabase
                 .from('jugadores')
                 .update({
                    nombre: form.nombre,
                    posicion: form.posicion,
                    edad: Number(form.edad),
                    estadisticas: form.estadisticas,
                    equipo: form.equipo,
                    precio: form.precio
                 })
                 .eq('id', editingId);
              
              if (error) throw error;
              alert('Jugador actualizado correctamente');
           } else {
              // Crear nuevo jugador
              const { error } = await supabase
                 .from('jugadores')
                 .insert([{
                    nombre: form.nombre,
                    posicion: form.posicion,
                    edad: Number(form.edad),
                    estadisticas: form.estadisticas,
                    equipo: form.equipo,
                    precio: form.precio,
                    activo: true
                 }]);
              
              if (error) throw error;
              alert('Jugador creado correctamente');
           }
           
           setShowModal(false);
           setEditingId(null);
           fetchJugadores(); // Recargar lista
        } catch (err) {
           alert('Error: ' + err.message);
           console.error('Error en handleSubmit:', err);
        }
     };

     const handleDeleteConfirmed = async (id) => {
        try {
           const { error } = await supabase
              .from('jugadores')
              .delete()
              .eq('id', id);
           
           if (error) throw error;
           alert('Jugador eliminado correctamente');
           setDeleteCandidate(null);
           fetchJugadores(); // Recargar lista
        } catch (err) {
           alert('Error al eliminar: ' + err.message);
           console.error('Error en handleDeleteConfirmed:', err);
        }
     };

     const handleDelete = (j) => {
        setDeleteCandidate({ id: j.id, nombre: j.nombre });
     };

     if (loading) return <div className='Gestion_jugadores'><p>Cargando jugadores...</p></div>;

     return(
        <>
   <div className='Gestion_jugadores'> 
      <div className='Gestion'>

         <div className='Jugadores-sup'>
            <div className='Jugadores'> 
               <h1>Jugadores</h1>
               <h4 className='sup'>Administra jugadores registrados</h4>
            </div>

            <div className='Boton-Nuevo'>
               <button type="button" onClick={openModal}> + Crear Nuevo</button>
            </div>  
         </div>

        <div className='Gestion-jugador'>
            <h1>Gestión de Jugadores</h1>
            <h4 className='sub'>Administra todos los jugadores registrados</h4>

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
                      {jugadores.length === 0 ? (
                        <p>No hay jugadores registrados</p>
                      ) : (
                        jugadores.map(j => (
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
                      ))
                      )}
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