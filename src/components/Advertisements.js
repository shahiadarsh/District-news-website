import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import ReactPlayer from "react-player/lazy";

const Advertisement = ({ ads, isAdmin, deleteAd, editAd }) => {
  const [editingId, setEditingId] = useState(null);
  const [editImage, setEditImage] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [editLink, setEditLink] = useState("");
  const { darkMode } = useTheme();

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditImage(item.image || "");
    setEditVideo(item.video || "");
    setEditLink(item.link || "");
  };

  const handleUpdate = (id) => {
    editAd(id, {
      image: editImage,
      video: editVideo,
      link: editLink,
    });
    setEditingId(null);
  };

  return (
    <div className="grid gap-8">
      {ads.map((item) => (
        <div
          key={item._id}
          className={`${
            darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          } p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200`}
        >
          {editingId === item._id ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(item._id);
              }}
              className="space-y-4"
            >
              <input
                type="url"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                placeholder="Image URL"
              />
              <input
                type="url"
                value={editVideo}
                onChange={(e) => setEditVideo(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                placeholder="Video URL"
              />
              <input
                type="url"
                value={editLink}
                onChange={(e) => setEditLink(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                placeholder="Ad Link"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="mb-4">{item.content}</p>
              {item.video ? (
                <div className="video-wrapper mb-4">
                  <ReactPlayer
                    url={item.video}
                    // light={item.image || true}
                    muted={true}
                    loop={true} 
                    playing={true}  
                    controls
                    width="100%"
                    height="100%"
                    className="rounded"
                  />
                </div>
              ) : item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover mb-4 rounded"
                />
              ) : null}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-bold py-2 px-4 rounded transition duration-200 mb-4`}
                >
                  Know More
                </a>
              )}
              {isAdmin && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => startEditing(item)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAd(item._id)}
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

export default Advertisement;