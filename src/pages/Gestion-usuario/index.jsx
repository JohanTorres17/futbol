import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";

import './style.css'


function Gestion_usuario () {
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
               <button> + Crear Nuevo</button>
            </div>  
         </div>

        <div className='Gestion-Usuario'>
            <h1>Gestión de Usuario</h1>
            <h4 className='sub'>Administra todos los usuarios del sistema </h4>

            <div className='Boton-Usuario'>
               <button> + Nuevo Usuario</button>
            </div>   
        </div>

        <div className='busqueda'>
         <input
            type='text'
            placeholder='Buscar usuarios por nombre o email..'
         />
        </div>

        <div className='Cartas-U'>
               <div className='Avatar'>CM</div>
            <div className='Datos'>
               <h3>Nombre</h3>
               <p>nombre@gmail.com</p>
            <div className='Actividad'>
               <h4 className='rol'>Admin</h4>
               <h4 className='Tiempo-activo'>Inactivo</h4>
            </div>
               <p>Ultima actividad: 2 min</p>
               <div className='Botones-Cartas'> 
                  <button className='editar'><HiOutlinePencil /> Editar </button>
                  <button className='basura'><HiTrash /></button>
               </div>
         </div>
        </div>

      </div> 
   </div>
   </>
  )
}

export default Gestion_usuario;