import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import ReactPlayer from "react-player/lazy";
import AdForm from "./AdForm";

const Advertisement = ({ ads, isAdmin, deleteAd, editAd }) => {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    video: "",
    link: "",
  });
  const { darkMode } = useTheme();

  const startEditing = (item) => {
    setEditingId(item._id);
    setFormData({
      image: null, // image will be uploaded again if needed
      video: item.video || "",
      link: item.link || "",
    });
  };

  const handleUpdate = (id) => {
    const updatedFormData = new FormData();
    if (formData.image) {
      updatedFormData.append("image", formData.image);
    }
    updatedFormData.append("video", formData.video);
    updatedFormData.append("link", formData.link);

    editAd(id, updatedFormData);
    setEditingId(null);
  };

  return (
    <div className="grid gap-8">
      {ads.map((item) => (
        <div
          key={item._id}
          className={`${
            darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
          } py-6 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200`}
        >
          {editingId === item._id ? (
            <AdForm
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(item._id);
              }}
              formData={formData}
              setFormData={setFormData}
              darkMode={darkMode}
              isEditing={true} 
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div>
              {item.video ? (
                <div className="video-wrapper mb-4">
                  <ReactPlayer
                    url={item.video}
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
                  className="w-full h-auto object-cover rounded"
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
                  } text-white font-bold py-2 px-4 rounded transition duration-200 mt-4`}
                >
                  Know More
                </a>
              )}
              {isAdmin && (
                <div className="flex mt-4 mb-4 space-x-4">
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
