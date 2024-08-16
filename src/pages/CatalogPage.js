import React, { useState } from 'react';
import NewsList from '../components/NewsList';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import Advertisement from '../components/Advertisements';

const CatalogPage = ({ addNews, news, deleteNews, editNews, ads, addAd, editAd, deleteAd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [tags, setTags] = useState([]);
  const [popularity, setPopularity] = useState(0);
  const [adImage, setAdImage] = useState('');
  const [adVideo, setAdVideo] = useState('');
  const [adLink, setAdLink] = useState('');
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showAdForm, setShowAdForm] = useState(false);
  const [showEditNews, setShowEditNews] = useState(false);
  const [showEditAds, setShowEditAds] = useState(false);
  const { darkMode } = useTheme();

  const blocks = ['All', 'Gorakhpur', 'Deoria', 'Kushinagar',,'Basti', 'Maharajganj'];

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    const newNews = {
      id: Date.now(),
      title,
      content,
      image,
      video,
      tags,
      popularity,
      timestamp: new Date().toISOString(),
    };
    addNews(newNews);
    setTitle('');
    setContent('');
    setImage('');
    setVideo('');
    setTags([]);
    setPopularity(0);
    setShowNewsForm(false);
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setTags(prev => {
      if (prev.includes(value)) {
        return prev.filter(tag => tag !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleAdSubmit = (e) => {
    e.preventDefault();
    const newAd = {
      id: Date.now(),
      image: adImage,
      video: adVideo,
      link: adLink,
    };
    addAd(newAd);
    setAdImage('');
    setAdVideo('');
    setAdLink('');
    setShowAdForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={darkMode ? 'text-white' : 'text-gray-900'}
    >
      <h1 className="text-3xl font-bold mb-6">Catalog</h1>
      
      <div className="mb-8">
        <button 
          onClick={() => setShowNewsForm(!showNewsForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 mb-4"
        >
          {showNewsForm ? 'Hide News Form' : 'Add News'}
        </button>
        {showNewsForm && (
          <form onSubmit={handleNewsSubmit} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block mb-1 font-medium">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block mb-1 font-medium">Image URL</label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="video" className="block mb-1 font-medium">Video URL</label>
              <input
                type="url"
                id="video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {blocks.map(block => (
                  <label key={block} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={block}
                      checked={tags.includes(block)}
                      onChange={handleTagChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{block}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="popularity" className="block mb-1 font-medium">Popularity (0-100)</label>
              <input
                type="number"
                id="popularity"
                value={popularity}
                onChange={(e) => setPopularity(Math.min(100, Math.max(0, parseInt(e.target.value))))}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                min="0"
                max="100"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Add News
            </button>
          </form>
        )}
      </div>

      <div className="mb-8">
        <button 
          onClick={() => setShowAdForm(!showAdForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mb-4"
        >
          {showAdForm ? 'Hide Ad Form' : 'Add Advertisement'}
        </button>
        {showAdForm && (
          <form onSubmit={handleAdSubmit} className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-4">
              <label htmlFor="adImage" className="block mb-1 font-medium">Ad Image URL</label>
              <input
                type="url"
                id="adImage"
                value={adImage}
                onChange={(e) => setAdImage(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="adVideo" className="block mb-1 font-medium">Ad Video URL</label>
              <input
                type="url"
                id="adVideo"
                value={adVideo}
                onChange={(e) => setAdVideo(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="adLink" className="block mb-1 font-medium">Ad Link</label>
              <input
                type="url"
                id="adLink"
                value={adLink}
                onChange={(e) => setAdLink(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
              />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
              Add Advertisement
            </button>
          </form>
        )}
      </div>

      <div className="mb-8">
        <button 
          onClick={() => setShowEditNews(!showEditNews)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 mb-4"
        >
          {showEditNews ? 'Hide Edit News' : 'Edit News'}
        </button>
        {showEditNews && (
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Edit News</h2>
            <NewsList news={news} isAdmin={true} deleteNews={deleteNews} editNews={editNews} darkMode={darkMode} />
          </div>
        )}
      </div>

      <div className="mb-8">
        <button 
          onClick={() => setShowEditAds(!showEditAds)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 mb-4"
        >
          {showEditAds ? 'Hide Edit Ads' : 'Edit Ads'}
        </button>
        {showEditAds && (
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Edit Ads</h2>
            <Advertisement  ads={ads} isAdmin={true} deleteAd={deleteAd} editAd={editAd} darkMode={darkMode} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CatalogPage;
