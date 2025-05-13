import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/homePage';
import SignUpPage from './pages/auth/SignUp/SignUpPage';
import LoginPage from './pages/auth/LogIn/LoginPage';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
// Components
import Sidebar from './components/common/SideBar';
import RightPanel from './components/common/RightPanel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common components are not wrapped within the Routes */}
      <Sidebar /> 
      <Routes>
        <Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  );
}

export default App;
