import { useState } from 'react';
import './style.css';

function Configuracion () {
  // Perfil temporal local mientras no se integra Supabase
  const [profile] = useState({
    email: 'admin@futbol.local',
    user_metadata: { full_name: 'Administrador', avatar_url: '' }
  });

  const handleLogout = () => {
    // Limpiar sesión local (si usas localStorage/sessionStorage)
    try {
      localStorage.removeItem('session');
    } catch (e) {}
    try { sessionStorage.clear(); } catch (e) {}
    // Redirigir al inicio
    window.location.href = '/';
  };

  return (
    <div className="config-page">
      <main className="config-content">
        <section className="profile-card">
          <div className="avatar">
            {profile.user_metadata?.avatar_url ? (
              <img src={profile.user_metadata.avatar_url} alt="avatar" />
            ) : (
              <div className="initials">{(profile.email || '').charAt(0).toUpperCase()}</div>
            )}
          </div>
          <div className="profile-info">
            <h3>{profile.user_metadata?.full_name ?? profile.email}</h3>
            <p className="muted">{profile.email}</p>
            <div className="form-actions">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Configuracion;