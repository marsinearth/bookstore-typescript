import React, { useState, useEffect } from 'react';

export default function Book({ title, img }) {
  const [checked, setCheck] = useState(false);
  if (checked) {
    window.alert(`${title} is checked!!!`);
  }
  return (
    <div className="book-container">
      <div className="title-container">
        <h4>{title}</h4>
        <input 
          type="checkbox" 
          checked={checked}
          onClick={() => setCheck(!checked)}           
        />
      </div>
      <img
        className="book-img"
        src={img}
        alt={title}
      />
    </div>
  );
}