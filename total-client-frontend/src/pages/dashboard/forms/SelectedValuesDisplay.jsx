import React from 'react';

const SelectedValuesDisplay = ({ selectedValues }) => {
  return (
    <div>
      <h4>Selected Values</h4>
      {selectedValues.length > 0 ? (
        <ul>
          {selectedValues.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>No values selected.</p>
      )}
    </div>
  );
};

export default SelectedValuesDisplay;
