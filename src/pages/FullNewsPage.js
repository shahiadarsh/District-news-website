import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import Advertisements from '../components/Advertisements';
import ReactPlayer from 'react-player/lazy';
import './FullNewsPage.css';
import MetaDecorator from '../components/utils/MetaDecorator';
import NoDataFound from '../components/NoDataFound';

// Importing share icons from react-icons
// Importing share icons from react-icons
import { FaWhatsapp, FaFacebookF,FaCheck, FaCopy, FaShareAlt } from 'react-icons/fa';
// Importing the new X (formerly Twitter) icon
import { FaXTwitter } from 'react-icons/fa6';

const FullNewsPage = ({ news, ads, blocks }) => {
  const { id } = useParams();
  const location = useLocation();
  const { darkMode } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [randomizedAds, setRandomizedAds] = useState([]);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  const isBlockPage = location.pathname.match(/^\/[^/]+$/);
  const blockName = isBlockPage ? location.pathname.slice(1) : null;
  const block = blocks ? blocks.find(b => b.name.toLowerCase() === blockName.toLowerCase()) : null;

  const contentItem = isBlockPage ? block : news.find((item) => item._id === id);

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
  }, [isMobile, contentItem]);
  if (!contentItem) {
    return <NoDataFound/>;
  }

  const metaDescription = contentItem.content.split('\n')[0].substring(0, 100) + '...';
  const pageUrl = `https://siddhartnagar-times.vercel.app${location.pathname}`;

  const shareContent = {
    title: contentItem.title.trimEnd(),
    text: metaDescription,
    url: pageUrl,
    image: contentItem.image || contentItem.video || '/channels4_profile.png',
  };

  const handleShare = (platform) => {
    let shareUrl;
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`*${shareContent.title}*\n\n${shareContent.text}\n\n${shareContent.url}`)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${shareContent.title}\n\n${shareContent.text}\n\n${shareContent.url}`)}`;
        break;
        case 'instagram':
          navigator.clipboard.writeText(`${shareContent.title}\n\n${shareContent.text}\n\n${shareContent.url}`);
          setCopied(true); // Set copied state to true
          setTimeout(() => setCopied(false), 2000); // Revert back after 2 seconds
          return;
      case 'x':
        shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(`${shareContent.title}\n\n${shareContent.text}\n\n${shareContent.url}`)}`;
        break;
      case 'share':
        navigator.share ? navigator.share(shareContent) : alert("Your browser doesn't support Web Share API.");
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
  };

  const renderContent = () => {
    const paragraphs = contentItem.content.split('\n');
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
    <div className={`flex flex-col md:flex-row md:space-x-8 ${darkMode ? 'text-gray-200' : ' text-gray-800'}`}>
    <MetaDecorator
        description={contentItem.content.split('\n')[0].substring(0, 20) + '...'}
        title={contentItem.title.split('\n')[0].substring(0, 20) + '...'}
        imageUrl={contentItem.image}
        imageAlt={contentItem.title.split('\n')[0].substring(0, 5)}
        pageUrl={pageUrl}
      />



      <div className="w-full md:w-2/3 max-w-4xl mx-auto py-8">
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{contentItem.title}</h1>
        {!isBlockPage && (
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 text-sm`}>
            {new Date(contentItem.timestamp).toLocaleString()}
          </p>
        )}

        <div className="mb-6">
          {contentItem.video ? (
            <div className={`video-wrapper w-full h-0 pt-[56.25%] relative ${playing ? 'playing' : ''}`}>
              <ReactPlayer
                url={contentItem.video}
                playing={playing}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                light={contentItem.image || true}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            </div>
          ) : contentItem.image ? (
            <div className="w-full h-0 pt-[56.25%] relative">
              <img
                src={contentItem.image}
                alt={contentItem.title}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ) : null}
        </div>
        <div 
          ref={contentRef}
          className={`text-lg leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {renderContent()}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
          {contentItem.tags && contentItem.tags.length > 0 && (
            <div className="mb-4 md:mb-0 flex-grow">
              <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Tags:</h2>
              <div className="flex flex-wrap gap-2">
                {contentItem.tags.map(tag => (
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
         <div className="flex space-x-2">
      <button
        onClick={() => handleShare('whatsapp')}
        className={`p-2 rounded-full text-white ${
          darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
        } transition duration-300`}
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </button>
      <button
        onClick={() => handleShare('facebook')}
        className={`p-2 rounded-full text-white ${
          darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } transition duration-300`}
        aria-label="Share on Facebook"
      >
        <FaFacebookF size={20} />
      </button>
      <button
        onClick={() => handleShare('x')}
        className={`p-2 rounded-full text-white ${
          darkMode ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-300 hover:bg-blue-400'
        } transition duration-300`}
        aria-label="Share on Twitter"
      >
        <FaXTwitter size={20} />
      </button>
      <button
        onClick={() => handleShare('instagram')}
        className={`p-2 rounded-full text-white ${
          darkMode ? 'bg-pink-500 hover:bg-pink-600' : 'bg-pink-400 hover:bg-pink-500'
        } transition duration-300`}
        aria-label="Share on Instagram"
      >
        {copied ? <FaCheck size={20}/> : <FaCopy size={20}/>}
      </button>
      <button 
        onClick={() => handleShare('share')}  
        className={`py-2 pl-2 pr-[0.55rem] rounded-full text-white ${
          darkMode ? 'bg-sky-500 hover:bg-sky-600' : 'bg-sky-400 hover:bg-sky-500'
        } transition duration-300`}
        aria-label="Share"
      >
        <FaShareAlt size={20} />
      </button>
    </div>
        </div>
      </div>
      
      {!isMobile && (
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className={`text-2xl font-semibold m-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advertisements</h2>
          <Advertisements ads={ads} />
        </div>
      )}
    </div>
  );
};

export default FullNewsPage;