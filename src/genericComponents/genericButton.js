import React from 'react';
import '../style/genericButtonStyle.css'; 
const GenericButton = ({ label, onClick, disabled }) => {
  return (
    <button className="generic-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default GenericButton;


