import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";

import './style.css'


function Gestion_usuario () {
     const [showModal, setShowModal] = useState(false);
     const [form, setForm] = useState({ nombre: '', email: '', role: 'Admin' });
     const [users, setUsers] = useState([
        { id: 1, nombre: 'Admin Demo', email: 'admin@demo.com', role: 'Admin', activo: true }
     ]);

     const openModal = () => {
        setForm({ nombre: '', email: '', role: 'Admin' });
        setShowModal(true);
     };
     const closeModal = () => setShowModal(false);

     const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre || !form.email) {
           alert('Por favor completa todos los campos.');
           return;
        }
        const nuevo = {
           id: Date.now(),
           nombre: form.nombre,
           email: form.email,
           role: form.role,
           activo: true
        };
        setUsers(prev => [nuevo, ...prev]);
        setShowModal(false);
     };

     const handleDelete = (id) => {
        if (!confirm('¿Eliminar este usuario?')) return;
        setUsers(prev => prev.filter(u => u.id !== id));
     };

     return(
        <>
   <div className='Gestion_usuario'> 
      <div className='Gestion'>

         <div className='Usuario-sup'>
            <div className='Usuario'> 
               <h1>Usuarios</h1>
               <h4 className='sup'>Gestiona los usuarios del sistema</h4>
            </div>

            <div className='Boton-Nuevo'>
               <button type="button" onClick={openModal}> + Crear Nuevo</button>
            </div>  
         </div>

        <div className='Gestion-Usuario'>
            <h1>Gestión de Usuario</h1>
            <h4 className='sub'>Administra todos los usuarios del sistema </h4>

            <div className='Boton-Usuario'>
               <button type="button" onClick={openModal}> + Nuevo Usuario</button>
            </div>   
        </div>

        <div className='busqueda'>
         <input
            type='text'
            placeholder='Buscar usuarios por nombre o email..'
         />
        </div>

        <div className='Cartas-List'>
           {users.map(user => (
             <div className='Cartas-U' key={user.id}>
               <div className='Avatar'>{user.nombre.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
               <div className='Datos'>
                 <h3>{user.nombre}</h3>
                 <p>{user.email}</p>
                 <div className='Actividad'>
                   <h4 className='rol'>{user.role}</h4>
                   <h4 className='Tiempo-activo'>{user.activo ? 'Activo' : 'Inactivo'}</h4>
                 </div>
                 <p>Ultima actividad: --</p>
                 <div className='Botones-Cartas'> 
                   <button className='editar'><HiOutlinePencil /> Editar </button>
                   <button className='basura' onClick={() => handleDelete(user.id)}><HiTrash /></button>
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
           <h2>Crear nuevo usuario (Admin)</h2>
           <button type="button" className="modal-close" onClick={closeModal} aria-label="Cerrar modal">✕</button>
         </div>
         <form onSubmit={handleSubmit} className="form-modal">
           <div className="form-row">
             <label>Nombre</label>
             <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" />
           </div>
           <div className="form-row">
             <label>Email</label>
             <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@dominio.com" />
           </div>
           <div className="form-row">
             <label>Rol</label>
             <select name="role" value={form.role} onChange={handleChange}>
               <option>Admin</option>
               <option>Usuario</option>
             </select>
           </div>
           <div className="modal-actions">
             <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
             <button type="submit" className="btn-submit">Crear usuario</button>
           </div>
         </form>
       </div>
     </div>
   )}

   </>
  )
}

export default Gestion_usuario;