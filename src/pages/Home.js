import React, { useState } from 'react';
import NewsList from '../components/NewsList';
import Advertisements from '../components/Advertisements';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

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

  // Function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Generate a list with alternating news and ads for mobile only
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} p-6`}
    >
      {/* Mobile view: Alternating news and ads */}
      <div className="flex flex-col md:hidden">
        {combinedItems.map((item, index) => (
          item.type === 'news' ? (
            <div key={index} className="w-full mb-8">
              <NewsList news={[item.item]} ads={[]} /> {/* Passing a single news item */}
            </div>
          ) : (
            <div key={index} className="w-full mb-8">
              <Advertisements ads={[item.item]} /> {/* Passing a single ad */}
            </div>
          )
        ))}
      </div>

      {/* Desktop and tablet view: Standard layout */}
      <div className="hidden md:flex md:flex-row md:space-x-8">
        {/* News column (2/3 width) */}
        <div className="w-full md:w-2/3">
          <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>All News</h1>
          <div className="mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out ${
                darkMode 
                  ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <option value="all">All News</option>
              <option value="recent">Recent News</option>
              <option value="popular">Popular News</option>
            </select>
          </div>
          <NewsList news={filteredNews()} ads={[]} />
        </div>

        {/* Advertisements column (1/3 width) */}
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advertisements</h2>
          <Advertisements ads={ads} />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
