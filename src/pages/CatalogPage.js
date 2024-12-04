import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import NewsList from "../components/NewsList";
import Advertisement from "../components/Advertisements"; 
import Blocks from '../components/Block';
import NewsForm from '../components/NewsForm';
import AdForm from '../components/AdForm';
import ToggleFormButton from '../components/ToggleFormButton';

const CatalogPage = ({
  addNews,
  news,
  deleteNews,
  editNews,
  ads,
  addAd,
  editAd,
  deleteAd,
}) => {
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    content: "",
    image: null,
    video: "",
    tags: [],
    popularity: 0,
  });
  const [adFormData, setAdFormData] = useState({
    image: null,
    video: "",
    link: "",
  });
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showAdForm, setShowAdForm] = useState(false);
  const [showEditNews, setShowEditNews] = useState(false);
  const [showEditAds, setShowEditAds] = useState(false);
  const { darkMode } = useTheme();

  const blocks = ["All", ...Blocks];

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newsFormData).forEach(([key, value]) => {
      if (key === 'tags') {
        value.forEach((tag) => formData.append("tags[]", tag));
      } else {
        formData.append(key, value);
      }
    });
    formData.append("timestamp", new Date().toISOString());
    addNews(formData);
    setNewsFormData({
      title: "",
      content: "",
      image: null,
      video: "",
      tags: [],
      popularity: 0,
    });
    setShowNewsForm(false);
  };

  const handleAdSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(adFormData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    addAd(formData);
    setAdFormData({
      image: null,
      video: "",
      link: "",
    });
    setShowAdForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={darkMode ? "text-white" : "text-gray-900"}
    >
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>

      <div className="mb-8">
        <ToggleFormButton
          onClick={() => setShowNewsForm(!showNewsForm)}
          showForm={showNewsForm}
          showText="Add News"
          hideText="Hide News Form"
          className="bg-blue-500 text-white hover:bg-blue-600"
        />
        {showNewsForm && (
          <NewsForm
            onSubmit={handleNewsSubmit}
            formData={newsFormData}
            setFormData={setNewsFormData}
            darkMode={darkMode}
            blocks={blocks}
          />
        )}
      </div>

      <div className="mb-8">
        <ToggleFormButton
          onClick={() => setShowAdForm(!showAdForm)}
          showForm={showAdForm}
          showText="Add Advertisement"
          hideText="Hide Ad Form"
          className="bg-green-500 text-white hover:bg-green-600"
        />
        {showAdForm && (
          <AdForm
            onSubmit={handleAdSubmit}
            formData={adFormData}
            setFormData={setAdFormData}
            darkMode={darkMode}
          />
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="mb-8">
          <ToggleFormButton
            onClick={() => setShowEditNews(!showEditNews)}
            showForm={showEditNews}
            showText="Edit News"
            hideText="Hide Edit News"
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          />
          {showEditNews && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Edit News</h2>
              <NewsList
                news={news}
                isAdmin={true}
                deleteNews={deleteNews}
                editNews={editNews}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="mb-8">
          <ToggleFormButton
            onClick={() => setShowEditAds(!showEditAds)}
            showForm={showEditAds}
            showText="Edit Ads"
            hideText="Hide Edit Ads"
            className="bg-yellow-500 text-white hover:bg-yellow-600"
          />
          {showEditAds && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Edit Ads</h2>
              <Advertisement
                ads={ads}
                isAdmin={true}
                deleteAd={deleteAd}
                editAd={editAd}
              />
            </div>
          )}
        </div>
        
      </div>
    </motion.div>
  );
};

export default CatalogPage;
