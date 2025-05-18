import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
// Pages
import HomePage from './pages/home/homePage';
import SignUpPage from './pages/auth/SignUp/SignUpPage';
import LoginPage from './pages/auth/LogIn/LoginPage';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
// Components
import Sidebar from './components/common/SideBar';
import RightPanel from './components/common/RightPanel';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useQuery } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

function App() {
  
  const { data: authUser, isLoading} = useQuery({
		// Use queryKey to give a unique name to query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* Common components are not wrapped within the Routes */}
      {authUser && <Sidebar /> }
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to= "/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to= "/" />} />
		<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to= "/" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to= "/login" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to= "/login" />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;
