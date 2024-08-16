import React from 'react';
import { useParams } from 'react-router-dom';
import NewsList from '../components/NewsList';
import Advertisements from '../components/Advertisements';
import { useTheme } from '../ThemeContext';

const BlockPage = ({ news, ads }) => {
  const { blockName } = useParams();
  const { darkMode } = useTheme();


  const blockNews = news.filter(item =>
    item.tags && (item.tags.includes(blockName) || item.tags.includes('All'))
  );

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const generateAlternatingList = () => {
    const shuffledAds = shuffleArray(ads);
    let result = [];
    let i = 0, j = 0;

    while (i < blockNews.length || j < shuffledAds.length) {
      if (i < blockNews.length) {
        result.push({ type: 'news', item: blockNews[i] });
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
    <div className={`flex flex-col ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-900'} p-6`}>
      <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{blockName} News</h1>


      <div className="flex flex-col md:hidden">
        {combinedItems.map((item, index) => (
          item.type === 'news' ? (
            <div key={index} className="w-full mb-8">
              <NewsList news={[item.item]} ads={[]} /> 
            </div>
          ) : (
            <div key={index} className="w-full mb-8">
              <Advertisements ads={[item.item]} />
            </div>
          )
        ))}
      </div>

    
      <div className="hidden md:flex md:flex-row md:space-x-8">
     
        <div className="w-full md:w-2/3">
          <NewsList news={blockNews} ads={[]} />
        </div>

       
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Advertisements</h2>
          <Advertisements ads={ads} />
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
