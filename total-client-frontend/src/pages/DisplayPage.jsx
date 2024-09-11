import React, { useState, useContext } from 'react';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './dashboard/DataContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Hook to navigate programmatically

const DisplayPage = ({ selectedData = {}, onValueChange }) => {
  const [showModal, setShowModal] = useState(false);
  const { setSelectedValues } = useContext(DataContext);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate(); // Hook to navigate

  // Format selectedValues for React Select
  const getFormattedValues = (formId) => {
    const { selectedValues } = selectedData[formId] || {};
    return selectedValues ? selectedValues.map(value => ({
      value: value,
      label: value
    })) : [];
  };

  // Handle change for a specific formId
  const handleChange = (formId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [formId]: option
    }));
    if (onValueChange) {
      onValueChange(formId, option);
    }
  };

  // Handle button click to show the modal
  const handleShow = () => setShowModal(true);

  // Handle close modal
  const handleClose = () => setShowModal(false);

  // Handle form submission
  const handleSubmit = () => {
    // Extract selected values
    const valuesToSubmit = Object.keys(selectedOptions).reduce((acc, formId) => {
      const selectedOption = selectedOptions[formId];
      if (Array.isArray(selectedOption)) {
        acc[formId] = selectedOption.map(opt => opt.value);
      } else if (selectedOption) {
        acc[formId] = [selectedOption.value];
      }
      return acc;
    }, {});

    // Save selected values to context
    setSelectedValues(valuesToSubmit);

    // Navigate to SelectedAttributes page
  };

  return (
    <div>
      <Button variant="btn btn-primary btn-block" onClick={handleShow}>
        Add Variations
      </Button>
      
      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>All Attributes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {Object.keys(selectedData).map(formId => {
            const formattedValues = getFormattedValues(formId);
            const currentSelectedOption = selectedOptions[formId] || (Array.isArray(formattedValues) ? [] : null);
            const { selectedAttribute } = selectedData[formId] || {};

            return (
              <div key={formId} className="mb-4">
                {selectedAttribute && (
                  <div>
                    <h3>{selectedAttribute.label}:</h3>
                    <Select
                      id={`select-${formId}`}
                      value={currentSelectedOption}
                      onChange={option => handleChange(formId, option)}
                      options={formattedValues}
                      placeholder="Select a value"
                      isClearable
                      //isMulti
                    />
                  </div>
                )}
              </div>
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save Variations</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DisplayPage;
