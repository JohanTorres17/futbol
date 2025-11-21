import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import './style.css'
import { supabase } from '../../database/supabase.jsx';

function Gestion_usuario () {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ nombre: '', email: '', role: 'Admin' });
    const [users, setUsers] = useState([
      { id: 1, nombre: 'Admin Demo', email: 'admin@demo.com', role: 'Admin', activo: true }
    ]);
    const [roleColumn, setRoleColumn] = useState('role');
    const [notification, setNotification] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [deleteCandidate, setDeleteCandidate] = useState(null);

    const fetchUsers = async () => {
      try {
        // La tabla 'usuarios' solo maneja nombre, rol y email.
        const col = roleColumn || 'role';
        // aliasamos la columna a 'role' para simplificar el mapeo
        const selectStr = `id, nombre, email, ${col} as role`;
        const { data, error } = await supabase
          .from('usuarios')
          .select(selectStr)
          .order('id', { ascending: false });
        if (error) {
          console.error('Error al cargar usuarios:', error);
          return;
        }
        console.debug('fetchUsers result count:', data?.length, data?.slice(0,3));
        // Mapear a la estructura que usa la UI (role en vez de rol). activo se añade solo para la vista.
        const mapped = data.map(u => ({
          id: u.id,
          nombre: u.nombre,
          email: u.email,
          role: u.role || 'Usuario',
          activo: true, // la BD no tiene esta columna; lo dejamos true para la UI
          _raw: u
        }));
        setUsers(mapped);
      } catch (err) {
        console.error('FetchUsers error:', err);
      }
    };

    // Detectar si la columna se llama 'role' o 'rol' y luego cargar usuarios
    const detectRoleColumn = async () => {
      try {
        const { error } = await supabase.from('usuarios').select('role').limit(1);
        if (!error) {
          setRoleColumn('role');
          return 'role';
        }
      } catch (e) {
        // sigue al siguiente intento
      }
      try {
        const { error } = await supabase.from('usuarios').select('rol').limit(1);
        if (!error) {
          setRoleColumn('rol');
          return 'rol';
        }
      } catch (e) {
        // no existe ninguna, dejar role por defecto
      }
      setRoleColumn('role');
      return 'role';
    };

    useEffect(() => {
      (async () => {
        await detectRoleColumn();
        await fetchUsers();
      })();
    }, []);

    const openModal = (user = null) => {
      if (user) {
        setForm({ nombre: user.nombre || '', email: user.email || '', role: user.role || 'Admin' });
        setEditingId(user.id);
      } else {
        setForm({ nombre: '', email: '', role: 'Admin' });
        setEditingId(null);
      }
      setShowModal(true);
    };
    const closeModal = () => { setShowModal(false); setEditingId(null); };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    };

    const showNotification = (message, type = 'success') => {
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3500);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.nombre || !form.email) {
        showNotification('Por favor completa todos los campos.', 'error');
        return;
      }

      try {
        if (editingId) {
          const payload = { nombre: form.nombre, email: form.email, [roleColumn]: form.role };
          const { data: updatedData, error } = await supabase
            .from('usuarios')
            .update(payload)
            .eq('id', editingId)
            .select();
          if (error) {
            console.error('Error al actualizar:', error);
            showNotification('Error al actualizar usuario: ' + (error.message || JSON.stringify(error)), 'error');
          } else {
            console.debug('Usuario actualizado:', updatedData);
            // Actualizar inmediatamente en la UI
            const updated = Array.isArray(updatedData) ? updatedData[0] : updatedData;
            const updatedUser = {
              id: updated.id,
              nombre: updated.nombre,
              email: updated.email,
              role: updated.role || updated.rol || form.role || 'Usuario',
              activo: true,
              _raw: updated
            };
            setUsers(prev => prev.map(u => (u.id === editingId ? updatedUser : u)));
            showNotification('Usuario actualizado correctamente.', 'success');
          }
        } else {
          // Insertar usando solo las columnas existentes: nombre, email, rol
          const payload = { nombre: form.nombre, email: form.email, [roleColumn]: form.role };
          const { data: insertedData, error } = await supabase
            .from('usuarios')
            .insert([payload])
            .select();
          if (error) {
            console.error('Error al crear usuario:', error);
            showNotification('Error al crear usuario: ' + (error.message || JSON.stringify(error)), 'error');
          } else {
            console.debug('Usuario creado:', insertedData);
            // Añadir inmediatamente el usuario creado a la UI
            const inserted = Array.isArray(insertedData) ? insertedData[0] : insertedData;
            const newUser = {
              id: inserted.id,
              nombre: inserted.nombre,
              email: inserted.email,
              role: inserted.role || inserted.rol || form.role || 'Usuario',
              activo: true,
              _raw: inserted
            };
            setUsers(prev => [newUser, ...prev]);
            showNotification('Usuario creado correctamente.', 'success');
          }
        }
      } catch (err) {
        console.error('handleSubmit error:', err);
      }

      setShowModal(false);
      setEditingId(null);
      fetchUsers(); // recargar desde BD
    };

    const handleDeleteConfirmed = async (id) => {
      try {
        const { data: deletedData, error } = await supabase.from('usuarios').delete().eq('id', id).select();
        if (error) {
          console.error('Error al eliminar:', error);
          showNotification('Error al eliminar usuario: ' + (error.message || JSON.stringify(error)), 'error');
        } else {
          console.debug('Usuario eliminado:', deletedData);
          // Eliminar inmediatamente de la UI
          setUsers(prev => prev.filter(u => u.id !== id));
          showNotification('Usuario eliminado correctamente.', 'success');
        }
      } catch (err) {
        console.error('handleDeleteConfirmed error:', err);
      }
      setDeleteCandidate(null);
      fetchUsers();
    };

    const handleDelete = (user) => {
      setDeleteCandidate({ id: user.id, nombre: user.nombre });
    };

     return(
        <>
   {notification && (
     <div className={`notification ${notification.type}`}>{notification.message}</div>
   )}
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
                   <button className='editar' onClick={() => openModal(user)}><HiOutlinePencil /> Editar </button>
                   <button className='basura' onClick={() => handleDelete(user)}><HiTrash /></button>
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
           <h2>{editingId ? 'Editar usuario (Admin)' : 'Crear nuevo usuario (Admin)'}</h2>
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
             <button type="submit" className="btn-submit">{editingId ? 'Guardar cambios' : 'Crear usuario'}</button>
           </div>
         </form>
       </div>
     </div>
   )}

   {/* Modal de confirmación para borrar usuario */}
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

export default Gestion_usuario;