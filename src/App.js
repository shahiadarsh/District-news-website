import React, { useState, useEffect } from "react";
import { HelmetProvider,Helmet } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import api from "./api"; // Axios instance with `withCredentials: true`
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlockPage from "./pages/BlockPage";
import CatalogPage from "./pages/CatalogPage";
import AdminLogin from "./pages/AdminLogin";
import FullNewsPage from "./pages/FullNewsPage";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Spinner from "./components/Spinner";
import NoDataFound from './components/NoDataFound';

function AppContent() {
  const [news, setNews] = useState([]);
  const [ads, setAds] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWaitMessage, setShowWaitMessage] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/admin");
        setIsAdmin(true);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    fetchNews();
    fetchAds();
  }, []);

  useEffect(() => {
    let timer;
    if (!isLoading && news.length === 0) {
      timer = setTimeout(() => {
        setShowWaitMessage(true);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isLoading, news.length]);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/news");
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAds = async () => {
    try {
      const response = await api.get("/ads");
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const addNews = async (newNews) => {
    try {
      const response = await api.post("/news", newNews);
      setNews([response.data, ...news]);
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const editNews = async (id, updatedNews) => {
    try {
      const response = await api.put(`/news/${id}`, updatedNews);
      setNews(news.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await api.delete(`/news/${id}`);
      setNews(news.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const addAd = async (newAd) => {
    try {
      const response = await api.post("/ads", newAd);
      setAds([response.data, ...ads]);
    } catch (error) {
      console.error("Error adding ad:", error);
    }
  };

  const editAd = async (id, updatedAd) => {
    try {
      const response = await api.put(`/ads/${id}`, updatedAd);
      setAds(ads.map((item) => (item._id === id ? response.data : item)));
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const deleteAd = async (id) => {
    try {
      await api.delete(`/ads/${id}`);
      setAds(ads.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const renderContent = (Component, props = {}) => {
    if (isLoading) {
      return <Spinner />;
    }
    

    if (news.length === 0) {
      if (showWaitMessage) {
         return <NoDataFound/>;
      }
      return <Spinner />;
    }
    return <Component {...props} />;
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Helmet>
        <meta name="description" content="Siddharthnagar News and Updates" />
        <title>Gorakhpur Times 24</title>
      </Helmet>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="flex-grow mx-2 sm:mx-6 md:mx-8 lg:mx-12 px-4 py-8">
        <Routes>
          <Route path="/" element={renderContent(Home, { news, ads })} />
          <Route
            path="/:blockName"
            element={renderContent(BlockPage, { news, ads })}
          />
          {!isAdmin && (
            <Route
              path="/admin"
              element={
                isLoading ? <Spinner /> : <AdminLogin setIsAdmin={setIsAdmin} />
              }
            />
          )}
          {isAdmin && (
            <Route
              path="/catalog"
              element={renderContent(CatalogPage, {
                addNews,
                news,
                deleteNews,
                editNews,
                ads,
                addAd,
                editAd,
                deleteAd,
              })}
            />
          )}
          <Route
            path="/news/:id"
            element={renderContent(FullNewsPage, { news, ads })}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
      </HelmetProvider>
  );
}

export default App;
