import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/supabase.js';
import { HiOutlinePencil, HiTrash } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { BsTrophyFill } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";

import './style.css'


function Dashboard () {
       const [usersCount, setUsersCount] = useState(null);
       const [jugadoresCount, setJugadoresCount] = useState(null);
       const [ligasCount, setLigasCount] = useState(null);

       useEffect(() => {
               let mounted = true;
               async function fetchCounts(){
                      try{
                              // ligas table exists in the project
                              const { count: ligasCnt, error: ligasErr } = await supabase.from('ligas').select('*', { count: 'exact', head: true });
                              if(ligasErr) console.warn('ligas count error', ligasErr.message);
                              if(mounted) setLigasCount(Number(ligasCnt) || 0);

                              // try jugadores table (may not exist)
                              const { count: jugadoresCnt, error: jugadoresErr } = await supabase.from('jugadores').select('*', { count: 'exact', head: true });
                              if(jugadoresErr) {
                                 // fallback: try 'players'
                                 const { count: playersCnt, error: playersErr } = await supabase.from('players').select('*', { count: 'exact', head: true });
                                 if(playersErr) {
                                    console.warn('jugadores/players count error', jugadoresErr.message, playersErr.message);
                                    if(mounted) setJugadoresCount(0);
                                 } else {
                                    if(mounted) setJugadoresCount(Number(playersCnt) || 0);
                                 }
                              } else {
                                 if(mounted) setJugadoresCount(Number(jugadoresCnt) || 0);
                              }

                              // try users table
                              const { count: usersCnt, error: usersErr } = await supabase.from('users').select('*', { count: 'exact', head: true });
                              if(usersErr) {
                                 // if no users table, try 'usuarios'
                                 const { count: usuariosCnt, error: usuariosErr } = await supabase.from('usuarios').select('*', { count: 'exact', head: true });
                                 if(usuariosErr) {
                                    console.warn('users/usuarios count error', usersErr.message, usuariosErr.message);
                                    if(mounted) setUsersCount(0);
                                 } else {
                                    if(mounted) setUsersCount(Number(usuariosCnt) || 0);
                                 }
                              } else {
                                 if(mounted) setUsersCount(Number(usersCnt) || 0);
                              }
                      }catch(err){
                              console.error('Error fetching counts', err);
                              if(mounted){ setUsersCount(0); setJugadoresCount(0); setLigasCount(0); }
                      }
               }
               fetchCounts();
               return () => { mounted = false };
       }, []);

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
               <h1 className='usuarios-totales'>{usersCount === null ? '...' : usersCount}</h1>
               <h3>USUARIOS TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>+2 esta semana</h3>
               </div>
            </div>
        </div>
        <div className='Cartas-J'>
               <div className='Avatar-badget'> <SlBadge /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales-j'>{jugadoresCount === null ? '...' : jugadoresCount}</h1>
               <h3>JUGADORES TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>+2 esta semana</h3>
               </div>
            </div>
        </div>
        <div className='Cartas-L'>
               <div className='Liga'> <BsTrophyFill /></div>
            <div className='Datos'>
               <h1 className='usuarios-totales-l'>{ligasCount === null ? '...' : ligasCount}</h1>
               <h3>LIGAS TOTALES</h3>
               <div className='Nuevos-usuarios'>
                  <h3 className='nuevos-u'>todas activas</h3>
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