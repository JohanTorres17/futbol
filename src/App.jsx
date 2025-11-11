import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';

/* Icons */
import { CiSearch } from "react-icons/ci";
import { TiThMenuOutline } from "react-icons/ti";
/*Home */
import { GoHome, GoHomeFill } from "react-icons/go";
/*user group */
import { FaUserGroup } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
/*badge */
import { SlBadge } from "react-icons/sl";
/*trophy */
import { BsTrophy, BsTrophyFill } from "react-icons/bs";
/*analytics */
import { IoMdAnalytics } from "react-icons/io";
/*settings */
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";


/*Pages */
import Dashboard from './pages/Dashboard/index'
import Gestion_usuario from'./pages/Gestion-usuario/index'
import Gestion_jugador from './pages/Gestion-jugadores/index'
import Liga from './pages/Liga/index'
import Analitica from './pages/Analitica/index'
import Configuracion from './pages/Configuracion/index'

import './App.css'

function Nav (){
  const location = useLocation();
  return (
    <nav className="Botones">

      <Link to="/lineas" 
        className={`Boton-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
        <div className='Tres-lineas'>
          <TiThMenuOutline size={25} className='tres-lineas'/>
        </div> 
      </Link>

      <div className='separador'></div>

      <Link to="/dashboard" 
        className={`Boton-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
        <div className='Boton-icon'>
          {location.pathname === "/dashboard" ? <GoHomeFill size={25} /> : <GoHome size={25} />}
        </div> 
      </Link>

      <Link to="/gestion-usuario" 
      className={`Boton-link ${location.pathname === "/gestion-usuario" ? "active" : ""}`}>
        <div className='Boton-icon'>
          {location.pathname === "/gestion-usuario" ? <FaUserGroup size={25} /> : <LuUsers size={25} />}
        </div>
      </Link>

      <Link to="/gestion-jugador" className={`Boton-link ${location.pathname === "/gestion-jugador" ? "active" : ""}`}>
        <div className='Boton-icon'>
          <SlBadge size={25} className='icon-badge'/>
        </div>    
      </Link>

      <Link to="/liga" className={`Boton-link ${location.pathname === "/liga" ? "active" : ""}`}>
        <div className='Boton-icon'>
          {location.pathname === "/liga" ? <BsTrophyFill size={25} /> : <BsTrophy size={25} />}
        </div>  
      </Link>
      
      <Link to="/analitica" className={`Boton-link ${location.pathname === "/analitica" ? "active" : ""}`}>
        <div className='Boton-icon'>
          <IoMdAnalytics size={25} className='icon-analitica'/>
        </div>    
      </Link>

      <Link to="/configuracion" className={`Boton-link ${location.pathname === "/configuracion" ? "active" : ""}`}>
        <div className='Boton-icon'>
          {location.pathname === "/configuracion" ? <IoSettingsSharp size={25} /> : <IoSettingsOutline size={25} />}
        </div>  
      </Link>

    </nav>

  );
}


function App() {
  
  return (
  <>
  <Router>

    
      <div className='Nav'>
      <Routes>
          <Route path='/' element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gestion-usuario" element={<Gestion_usuario />} />
          <Route path="/gestion-jugador" element={<Gestion_jugador />} />
          <Route path="/liga" element={<Liga />} />
          <Route path="/analitica" element={<Analitica />} />
          <Route path="/configuracion" element={<Configuracion />} />

          <Route path='*' element={<Dashboard />} />
      </Routes>
      <Nav />

      </div>
    </Router>

  </>
  );
}

export default App