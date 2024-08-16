import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Advertisements from '../components/Advertisements';
import ReactPlayer from 'react-player/lazy';
import './FullNewsPage.css';

const FullNewsPage = ({ news, ads }) => {
  const { id } = useParams();
  const newsItem = news.find((item) => item._id === id);
  const { darkMode } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [randomizedAds, setRandomizedAds] = useState([]);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (ads && ads.length > 0) {
      setRandomizedAds([...ads].sort(() => Math.random() - 0.5));
    }
  }, [ads]);

  useEffect(() => {
    if (isMobile && contentRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      const adContainers = contentRef.current.querySelectorAll('.ad-container');
      adContainers.forEach((container) => observer.observe(container));

      return () => observer.disconnect();
    }
  }, [isMobile, newsItem]);

  if (!newsItem) return <div className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} text-center text-xl mt-8`}>News not found</div>;

  const renderContent = () => {
    const paragraphs = newsItem.content.split('\n');
    const result = [];
    let adIndex = 0;

    for (let i = 0; i < paragraphs.length; i++) {
      result.push(<p key={i} className="mb-4">{paragraphs[i]}</p>);
      
      if (isMobile && (i + 1) % 5 === 0 && adIndex < randomizedAds.length) {
        result.push(
          <div key={`ad-${i}`} className="ad-container my-4 opacity-0 transition-opacity duration-500">
            <Advertisements ads={[randomizedAds[adIndex]]} />
          </div>
        );
        adIndex++;
      }
    }

    if (isMobile && adIndex < randomizedAds.length) {
      result.push(
        <div key="final-ad" className="ad-container my-4 opacity-0 transition-opacity duration-500">
          <Advertisements ads={[randomizedAds[adIndex]]} />
        </div>
      );
    }

    return result;
  };

  return (
    <div className={`flex flex-col md:flex-row md:space-x-8 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="md:w-2/3 max-w-4xl mx-auto px-4 py-8">
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{newsItem.title}</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 text-sm`}>
          {new Date(newsItem.timestamp).toLocaleString()}
        </p>
        {!newsItem.video && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full max-h-96 object-cover mb-6 rounded-lg shadow-md"
          />
        )}
        {newsItem.video && (
          <div className={`video-wrapper mb-6 ${playing ? 'playing' : ''}`}>
            <ReactPlayer
              url={newsItem.video}
              playing={playing}
              controls
              width="100%"
              height="100%"
              className="rounded-lg shadow-md"
              light={newsItem.image || true}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          </div>
        )}
        <div 
          ref={contentRef}
          className={`text-lg leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {renderContent()}
        </div>
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="mt-8">
            <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tags:</h2>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {!isMobile && (
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advertisements</h2>
          <Advertisements ads={ads} />
        </div>
      )}
    </div>
  );
};

export default FullNewsPage;