import React from 'react';

function CategoryBox({ category, data, handleInputChange, handleAddEvent, handleRemoveEvent, addCategory }) {
  return (
    <div className="category-container">
      <div className="category-box" style={{ width: '550px' }}>
        <h3 id='basics-title'>{category}</h3>
        {data?.showForm ? (
          <div>
            {data.events.map((event, index) => (
              <div key={index}>
                <label id='basics-labels'>What did you do?</label>
                <textarea
                  type="text"
                  placeholder="Describe in 2-3 sentences"
                  value={event.description || ''}
                  onChange={(e) => handleInputChange(category.toLowerCase(), index, 'description', e.target.value)}
                />
                {index > 0 && (
                  <button onClick={() => handleRemoveEvent(category.toLowerCase(), index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => handleAddEvent(category.toLowerCase())}>Add</button>
            <br />
          </div>
        ) : (
          <button onClick={() => addCategory(category.toLowerCase())}>
            {data?.events.length > 0 ? 'Add More' : 'Add'}
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryBox;
