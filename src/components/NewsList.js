import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import ReactPlayer from 'react-player/lazy';
import NewsForm from './NewsForm';
import Blocks from './Block';

const NewsList = ({ news, isAdmin, deleteNews, editNews }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    video: '',
    tags: [],
    popularity: '',
  });
  const { darkMode } = useTheme();
  const blocks = ['All', ...Blocks];

  const startEditing = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      content: item.content,
      image: null, 
      video: item.video || '',
      tags: item.tags || [],
      popularity: item.popularity || '',
    });
  };

  const handleUpdate = (id) => {
    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('content', formData.content);
    if (formData.image) updatedData.append('image', formData.image);
    updatedData.append('video', formData.video);
    formData.tags.forEach((tag) => updatedData.append('tags[]', tag));
    updatedData.append('popularity', formData.popularity);

    editNews(id, updatedData);
    setEditingId(null);
  };

  return (
    <div className="grid gap-8">
      {news.map((item) => (
        <div
          key={item._id}
          className={`${
            darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
          } p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200`}
        >
          {editingId === item._id ? (
            <NewsForm
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(item._id);
              }}
              formData={formData}
              setFormData={setFormData}
              darkMode={darkMode}
              blocks={blocks}
              isEditing
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div>
              <Link
                to={`/news/${item._id}`}
                className={`text-2xl font-bold mb-2 ${
                  darkMode
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-800'
                } transition duration-200`}
              >
                {item.title}
              </Link>
              <p
                className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } mb-4 text-sm`}
              >
                {new Date(item.timestamp).toLocaleString()}
              </p>
              {item.video && (
                <div className="video-wrapper mb-4 w-full h-0 pt-[56.25%] relative">
                  <ReactPlayer
                    url={item.video}
                    light={item.image || true}
                    controls
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 w-full h-full rounded"
                  />
                </div>
              )}
              {!item.video && item.image && (
                <div className="image-wrapper mb-4 w-full h-0 pt-[56.25%] relative">
                  <img
                    src={item.image}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                  />
                </div>
              )}
              <Link to={`/news/${item._id}`}>
                <p className="mb-4 leading-relaxed line-clamp-3 transition duration-200">
                  {item.content.split(' ').slice(0, 50).join(' ') +
                    (item.content.split(' ').length > 50 ? '...' : '')}
                </p>
              </Link>
              {isAdmin && item.popularity && (
                <p className="mb-4 text-lg font-semibold transition duration-200">
                  Popularity: {item.popularity}
                </p>
              )}
              {item.tags && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map(
                    (tag) =>
                      tag && (
                        <span
                          key={tag}
                          className={`${
                            darkMode
                              ? 'bg-blue-900 text-blue-200'
                              : 'bg-blue-100 text-blue-800'
                          } text-xs font-semibold px-2.5 py-0.5 rounded`}
                        >
                          {tag}
                        </span>
                      )
                  )}
                </div>
              )}
              {isAdmin && (
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => startEditing(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNews(item._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsList;
