
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RatesPage from './pages/RatesPage';
import ProfilePage from './pages/ProfilePage';
import ChatBot from './components/ChatBot';
import LiveVoiceAssistant from './components/LiveVoiceAssistant';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#0B132B] text-gray-900 dark:text-white selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/rates" element={<RatesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
          <LiveVoiceAssistant />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
