// frontend/src/App.js
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Splash */}
        <Route path='/' element={<SplashRedirect />} />

        {/* Public routes */}
        <Route path='/home' element={<HomePage />} />
        <Route path='/posts/:id' element={<PostPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />

        {/* Protected routes */}
        <Route path='/profile'
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/create-post'
          element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />

        {/* Admin only */}
        <Route path='/admin'
          element={<ProtectedRoute role='admin'><AdminPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function SplashRedirect() {
  const navigate = useNavigate();
  return <SplashPage onComplete={() => navigate('/home')} />;
}

export default App;