import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlockPage from './pages/BlockPage';
import CatalogPage from './pages/CatalogPage';
import AdminLogin from './pages/AdminLogin';
import FullNewsPage from './pages/FullNewsPage';
import { ThemeProvider, useTheme } from './ThemeContext';

const API_BASE_URL = 'http://localhost:5000/api';

function AppContent() {
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { darkMode } = useTheme();
  console.log("news is ",news);

  useEffect(() => {
    fetchNews();
    fetchAds();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ads`);
      setAds(response.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const addNews = async (newNews) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/news`, newNews);
      setNews([response.data, ...news]);
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const editNews = async (id, updatedNews) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/news/${id}`, updatedNews);
      setNews(news.map(item => item._id === id ? response.data : item));
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      console.log("id id",id);
      await axios.delete(`${API_BASE_URL}/news/${id}`);
      setNews(news.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const addAd = async (newAd) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ads`, newAd);
      setAds([response.data, ...ads]);
    } catch (error) {
      console.error('Error adding ad:', error);
    }
  };

  const editAd = async (id, updatedAd) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/ads/${id}`, updatedAd);
      setAds(ads.map(item => item._id === id ? response.data : item));
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const deleteAd = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/ads/${id}`);
      setAds(ads.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };


  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'}`}>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="flex-grow mx-4 sm:mx-6 md:mx-8 lg:mx-12 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home news={news} ads={ads} />} />
          <Route path="/:blockName" element={<BlockPage news={news} ads={ads} />} />
          <Route path="/admin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
          <Route 
            path="/catalog" 
            element={
              isAdmin ? (
                <CatalogPage 
                  addNews={addNews} 
                  news={news} 
                  deleteNews={deleteNews} 
                  editNews={editNews} 
                  ads={ads}
                  addAd={addAd}
                  editAd={editAd}
                  deleteAd={deleteAd}
                />
              ) : (
                <Navigate to="/admin" />
              )
            } 
          />
          <Route path="/news/:id" element={<FullNewsPage news={news} ads={ads} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
