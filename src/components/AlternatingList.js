import React from 'react';
import NewsList from '../components/NewsList';
import Advertisements from '../components/Advertisements';

const AlternatingList = ({ combinedItems }) => {
  return (
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
  );
};

export default AlternatingList;
