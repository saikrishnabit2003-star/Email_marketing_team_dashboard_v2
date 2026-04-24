import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';
import './App.css'
import { UserPage } from './components/UserPage'
import Loginpage2 from './components/Loginpage2'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tablepage } from './components/Tablepage';
import { Accounts } from './components/Accounts';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Profilepage from './components/Profilepage';
import MagentaLogo from './assets/Magenta data visualisation on monitor.png';
import Faceicon from './assets/faceicon.png';
import DownArrowIcon from './assets/downarrow.png';
// Dashboard layout: sidebar + header + the routed page content
function DashboardLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const navigate = useNavigate();
  const [username,setusername]=useState("User name")
    useEffect(() => {
         
          const token = localStorage.getItem('token');
          console.log(token)
          if (token) {
              fetch("https://email-marketing-dashboard-v1.vercel.app/users/me/details", {
                  method: "GET",
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              })
                  .then(response => response.json())
                  .then(data => {
                      setusername(data?.data.full_name)
                      if (data?.data.role) {
                          localStorage.setItem('user_role', data.data.role);
                      }
                  })
                  .catch(error => console.error(error));
          }
      }, []);
  return (
    <div className="fullpage">
      <div className="sidebar">
        <div id="navtitle">
          <div>
            <img src={MagentaLogo} alt="" />
          </div>
          <h3>Dashboard</h3>
        </div>

        <div id='navBtn'>
          <NavLink to="/dashboard" style={{textDecoration:"none"}} end>
            <button>Overall Dashboard</button>
          </NavLink>
          <NavLink to="/table" style={{textDecoration:"none"}}>
            <button>Table</button>
          </NavLink>
          <NavLink to="/accounts" style={{textDecoration:"none"}}>
            <button>Accounts</button>
          </NavLink>
        </div>
      </div>

      <div className="pages">
        <div id='pageheader'>
          <div id='header-search'>
            <span style={{ color: '#ccc', marginRight: '10px' }}>🔍</span>
            <input 
              type="search" 
              placeholder='Search Here' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
  
          </div>
          <div id='userprofile'>
            <img src={Faceicon} alt="profile" />
            <h3>{username}</h3>
            <button id='dropdown-btn' onClick={handleDropdown}><img src={DownArrowIcon} alt="" /></button>
            {
              showDropdown && (
                <div className='dropdown'>
                   <button onClick={() => navigate('/profile')}>My Profile</button>

                   <button id='logout-btn' onClick={() => {
                     localStorage.removeItem('token');
                     localStorage.removeItem('user_role');
                     navigate('/');
                   }}>Logout</button>
                 </div>
              )
            }
          </div>
        </div>

        <div className='otherpages'>
          <Routes>
            <Route path="/dashboard" element={<UserPage searchTerm={searchTerm} />} />
            <Route path="table" element={<Tablepage searchTerm={searchTerm} />} />
            <Route path="accounts" element={<Accounts searchTerm={searchTerm} />} />
            <Route path="profile" element={<Profilepage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Login page — no sidebar/header */}
      <Route path="/" element={<Loginpage2 />} />

      {/* Dashboard and its nested pages protected by login */}
      <Route path="/*" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      } />

      {/* Catch-all → redirect to login */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
}

export default App
