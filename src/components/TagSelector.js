import React from 'react';

const TagSelector = ({ tags, selectedTags, onChange, blocks }) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Tags</label>
    <div className="flex flex-wrap gap-2">
      {blocks.map((block) => (
        <label key={block} className="inline-flex items-center">
          <input
            type="checkbox"
            value={block}
            checked={selectedTags.includes(block)}
            onChange={onChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">{block}</span>
        </label>
      ))}
    </div>
  </div>
);
export default TagSelector;