import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { RiTShirtLine } from "react-icons/ri";

import './style.css'

function Gestion_jugador () {
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
               <button> + Crear Nuevo</button>
            </div>  
         </div>

        <div className='Gestion-jugador'>
            <h1>Gestión de Jugadors</h1>
            <h4 className='sub'>Administra todos los jugadores registrados </h4>

            <div className='Boton-Jugador'>
               <button> + Nuevo Jugador</button>
            </div>   
        </div>

        <div className='busqueda'>
         <input
            type='text'
            placeholder='Buscar usuarios por nombre o email..'
         />
        </div>

            <div className='Cartas-U'>
               <div className='Avatar'>LM</div>
                  <div className='Datos'>
                        <h3>Lionel Messi</h3>
                        <p>FC Barcelona</p>
                        <p>36</p>
                     <div className='Actividad'>
                        <h4 className='rol'><RiTShirtLine />  Delantero</h4>
                        <h4 className='Tiempo-activo'>Activo</h4>
                     </div>
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

export default Gestion_jugador;