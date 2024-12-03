import Form from "./Form";
import ImageUpload from "./ImageUpload";
import FormInput from "./FormInput";

const AdForm = ({ onSubmit, formData, setFormData, darkMode, isEditing, onCancel }) => (
  <Form onSubmit={onSubmit} darkMode={darkMode}>
    <ImageUpload
      label="Ad Image"
      id="adImage"
      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      preview={formData.image}
      darkMode={darkMode}
    />
    <FormInput
      label="Ad Video URL"
      id="adVideo"
      type="url"
      value={formData.video}
      onChange={(e) => setFormData({ ...formData, video: e.target.value })}
      darkMode={darkMode}
    />
    <FormInput
      label="Ad Link"
      id="adLink"
      type="url"
      value={formData.link}
      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
      darkMode={darkMode}
    />
    <div className="flex space-x-2 mt-4">
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      >
        {isEditing ? 'Update Ad' : 'Add Advertisement'}
      </button>

      {/* Conditionally render the Cancel button if in editing mode */}
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

export default AdForm;
