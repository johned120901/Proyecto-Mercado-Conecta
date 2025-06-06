import { useEffect, useState } from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import BusinessGrid from '../components/BusinessGrid';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../components/providers/authContext';



export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const hasLogin = () => {
      if (user) {
        navigate('/dashboard')
      }
    }

    hasLogin();
  });
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <Hero />
      <BusinessGrid />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
