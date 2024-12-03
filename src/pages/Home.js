import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import AlternatingList from '../components/AlternatingList';
import NewsList from '../components/NewsList';
import Advertisements from '../components/Advertisements';

const Home = ({ news, ads }) => {
  const [filter, setFilter] = useState('all');
  const { darkMode } = useTheme();

  const filteredNews = () => {
    switch (filter) {
      case 'recent':
        return [...news].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
      case 'popular':
        return [...news].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
      default:
        return news;
    }
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const generateAlternatingList = () => {
    const shuffledAds = shuffleArray(ads);
    const currentNews = filteredNews();
    let result = [];
    let i = 0, j = 0;

    while (i < currentNews.length || j < shuffledAds.length) {
      if (i < currentNews.length) {
        result.push({ type: 'news', item: currentNews[i] });
        i++;
      }
      if (j < shuffledAds.length) {
        result.push({ type: 'ad', item: shuffledAds[j] });
        j++;
      }
    }
    return result;
  };

  const combinedItems = generateAlternatingList();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="mb-4 md:mb-5 flex justify-between">
        <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Top Stories
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={`p-[0.3rem] border rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out ${
            darkMode
              ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Use AlternatingList for mobile */}
      <AlternatingList combinedItems={combinedItems} />

      {/* Desktop layout */}
      <div className="hidden md:flex md:flex-row md:space-x-8">
        <div className="w-full md:w-2/3">
          <NewsList news={filteredNews()} ads={[]} />
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Advertisements
          </h2>
          <Advertisements ads={ads} />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
