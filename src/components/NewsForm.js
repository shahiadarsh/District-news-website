import React from 'react';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';
import ImageUpload from './ImageUpload';
import TagSelector from './TagSelector';
import Form from './Form';

const NewsForm = ({
  onSubmit,
  formData,
  setFormData,
  darkMode,
  blocks,
  isEditing = false,
  onCancel,
}) => (
  <Form onSubmit={onSubmit} darkMode={darkMode}>
    <FormInput
      label="Title"
      id="title"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      required
      darkMode={darkMode}
    />
    <FormTextArea
      label="Content"
      id="content"
      value={formData.content}
      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      required
      darkMode={darkMode}
    />
    <ImageUpload
      label="Image"
      id="image"
      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      preview={formData.image}
      darkMode={darkMode}
    />
    <FormInput
      label="Video URL"
      id="video"
      type="url"
      value={formData.video}
      onChange={(e) => setFormData({ ...formData, video: e.target.value })}
      darkMode={darkMode}
    />
    <TagSelector
      tags={formData.tags}
      selectedTags={formData.tags}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          tags: prev.tags.includes(value)
            ? prev.tags.filter((tag) => tag !== value)
            : [...prev.tags, value],
        }));
      }}
      blocks={blocks}
    />
    <FormInput
      label="Popularity (0-100)"
      id="popularity"
      type="number"
      value={formData.popularity}
      onChange={(e) =>
        setFormData({
          ...formData,
          popularity: Math.min(100, Math.max(0, parseInt(e.target.value))),
        })
      }
      min="0"
      max="100"
      darkMode={darkMode}
    />
    <div className="flex space-x-2">
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      >
        {isEditing ? 'Update' : 'Add News'}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Cancel
        </button>
      )}
    </div>
  </Form>
);

export default NewsForm;
