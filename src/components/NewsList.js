import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import ReactPlayer from "react-player/lazy";
import "./NewsList.css";

const NewsList = ({ news, isAdmin, deleteNews, editNews }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editVideo, setEditVideo] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [editPopularity, setEditPopularity] = useState("");
  const { darkMode } = useTheme();

  const blocks = [
    "All",
    "Kapilvastu",
    "Dumariyaganj",
    "Shorathgarh",
    "Bansi",
    "Itwa",
  ];


  const startEditing = (item) => {
    console.log("item is",item._id);
    setEditingId(item._id);
    console.log("item is",item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditImage(item.image || "");
    setEditVideo(item.video || "");
    setEditTags(item.tags || []);
    setEditPopularity(item.popularity || "");
  };

  const handleUpdate = (id) => {
    editNews(id, {
      title: editTitle,
      content: editContent,
      image: editImage,
      video: editVideo,
      tags: editTags,
      popularity: editPopularity,
    });
    setEditingId(null);
  };

  const handleTagChange = (value) => {
    setEditTags((prev) =>
      prev.includes(value)
        ? prev.filter((tag) => tag !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="grid gap-8">
      {news.map((item) => (
        <div
          key={item.id}
          className={`${
            darkMode ? "bg-gray-800 text-gray-200 "  : "bg-white text-gray-800"
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
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                required
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                rows="4"
                required
              ></textarea>
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
                type="number"
                value={editPopularity}
                onChange={(e) => setEditPopularity(e.target.value)}
                className={`w-full p-2 border rounded ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
                placeholder="Popularity"
              />
              <div className="flex flex-wrap gap-2">
                {blocks.map((block) => (
                  <label key={block} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={block}
                      checked={editTags.includes(block)}
                      onChange={() => handleTagChange(block)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{block}</span>
                  </label>
                ))}
              </div>
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
              <Link
                to={`/news/${item._id}`}
                className={`text-2xl font-bold mb-2 ${
                  darkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-800"
                } transition duration-200`}
              >
                {item.title}
              </Link>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } mb-4 text-sm`}
              >
                {new Date(item.timestamp).toLocaleString()}
              </p>
              {item.video && (
                <div className="video-wrapper mb-4 ">
                  <ReactPlayer
                    url={item.video}
                    light={item.image || true}
                    controls
                    width="100%"
                    height="100%"
                    className="rounded"
                  />
                </div>
              )}
              {!item.video && item.image && (
                <img
                  src={item.image}
                  // alt={item.title}
                  className="w-full h-auto object-cover mb-4 rounded"
                />
              )}
               <Link
                to={`/news/${item._id}`}>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-700"
                } mb-4 leading-relaxed line-clamp-3`}
              >
                {item.content.split(" ").slice(0, 50).join(" ") + (item.content.split(" ").length > 50 ? "..." : "")}
              </p></Link>
              {isAdmin && item.popularity && (
                <p
                  className={`${
                    darkMode ? "text-gray-500" : "text-gray-600"
                  } mb-4 text-lg font-semibold`}
                >
                  Popularity: {item.popularity}
                </p>
              )}
              {item.tags && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`${
                        darkMode
                          ? "bg-blue-900 text-blue-200"
                          : "bg-blue-100 text-blue-800"
                      } text-xs font-semibold px-2.5 py-0.5 rounded`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
