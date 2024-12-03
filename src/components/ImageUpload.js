const ImageUpload = ({ label, id, onChange, preview, darkMode }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type="file"
        id={id}
        onChange={onChange}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
        }`}
        accept="image/*"
      />
      {preview ? (
        <img
          src={URL.createObjectURL(preview)}
          alt="Selected"
          className="w-32 h-32 mt-2 object-cover"
        />
      ) : (
        <p className="mt-2">No image selected</p>
      )}
    </div>
  );

  export default ImageUpload;