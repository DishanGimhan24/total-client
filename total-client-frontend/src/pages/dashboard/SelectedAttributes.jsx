import React, { useContext, useEffect } from 'react';
import { DataContext } from './DataContext'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom';

const SelectedAttributes = () => {
  const { selectedValues,setSelectedValues } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedValues) {
      const allValues = Object.values(selectedValues).flat();
      console.log(`All Joined Values: ${allValues.join(', ')}`);
    }
  }, [selectedValues]);

  if (!selectedValues) {
    return <div>No selected values available.</div>;
  }

  const handleDelete = () => {
    setSelectedValues({});
  };
  const handleEdit = () => {
    navigate('/dashboard/proform', { state: { showModal: true } });

  };

  const allJoinedValues = Object.values(selectedValues).flat().join(', ');

  return (
    <div className="selected-attributes border border-primary rounded p-2">
      {allJoinedValues ? (
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-break mb-0">{allJoinedValues}</p>
          <div>
            <button className="btn btn-primary me-2 " onClick={handleEdit}><i class="bi bi-pen"></i></button>
            <button className="btn btn-danger " onClick={handleDelete}><i class="bi bi-trash"></i></button>
          </div>
        </div>
      ) : (
        <p className="text-muted mb-0">No attributes selected.</p>
      )}
    </div>
  );
};

export default SelectedAttributes;
