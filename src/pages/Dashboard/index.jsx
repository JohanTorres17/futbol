import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { BsTrophyFill } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";

import './style.css'


function Dashboard () {
     return(
        <>
   <div className='Dashboard'> 
      <div className='Dashboard-Contenedor'>

         <div className='Dashboard-sup'>
            <div className='Dashboard-titulo'> 
               <h1>Dashboard</h1>
               <h4 className='sup'>Panel de control general</h4>
            </div> 
         </div>

        <div className='Dashboard-sub'>
            <h1>Dashboard</h1>
            <h4 className='sub'> Resumen general del sistema </h4> 
        </div>

        <div className='Cartas-U'>
               <div className='Avatar'> <FaUserGroup /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales'>4</h1>
               <h3>USUARIOS TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>+2 esta semana</h3>
               </div>
            </div>
        </div>
        <div className='Cartas-J'>
               <div className='Avatar-badget'> <SlBadge /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales-j'>4</h1>
               <h3>USUARIOS TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>+2 esta semana</h3>
               </div>
            </div>
        </div>
        <div className='Cartas-L'>
               <div className='Liga'> <BsTrophyFill /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales-l'>4</h1>
               <h3>LIGAS TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>todas activas</h3>
               </div>
            </div>
        </div>
        <div className='Cartas-M'>
               <div className='Analitica'> <IoMdAnalytics /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales-m'>4</h1>
               <h3>LIGAS ACTIVAS</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>En progreso</h3>
               </div>
            </div>
        </div>

        <div className='Cartas-A'>
            <div className='Actividad-R'>Actividad Reciente</div>

               <div className='usuarios'>

                  <div className='Avatar'>MC</div>
                     <div className='Datos'>
                           <h3>Nombre</h3>
                           <p>Activo hace 2 min</p>
                     </div>
                     <div className='estado'></div>

               </div>
               <div className='usuarios'>

                  <div className='Avatar'>DG</div>
                     <div className='Datos'>
                           <h3>Nombre2</h3>
                           <p>Activo hace 5 min</p>
                     </div>
                     <div className='estado'></div>
               </div>
        </div>

         <div className='Cartas-Top'>
            <div className='Actividad-Mejores-Jugadores'>Mejores Jugadores</div>

               <div className='usuarios'>

                  <div className='Avatar'>MC</div>
                     <div className='Datos'>
                           <h3>Nombre</h3>
                           <p>fc barcelona</p>
                     </div>
                     <div className='estado'></div>

               </div>
               <div className='usuarios'>

                  <div className='Avatar'>DG</div>
                     <div className='Datos'>
                           <h3>Nombre2</h3>
                           <p>real madrid</p>
                     </div>
                     <div className='estado'></div>
               </div>
        </div>

      </div> 
   </div>
        </>
     )
}

export default Dashboard;