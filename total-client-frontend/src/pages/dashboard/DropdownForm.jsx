import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CloseButton from 'react-bootstrap/CloseButton';

const DropdownForm = ({ attributes, onAttributeChange, onValuesChange }) => {
  const [forms, setForms] = useState([
    { id: Date.now(), selectedAttribute: null, filteredValues: [], selectedValues: [], isChecked: false }
  ]);
  // const [showForm, setShowForm] = useState(true); // Commented out

  // const handleClose = () => setShowForm(false); // Commented out

  const handleAttributeChange = (selectedOption, formId) => {
    const selectedAttr = attributes.find(attr => attr._id === selectedOption.value);
    setForms(prevForms =>
      prevForms.map(form =>
        form.id === formId
          ? {
              ...form,
              selectedAttribute: selectedOption,
              filteredValues: selectedAttr ? selectedAttr.values.map(value => ({ label: value, value })) : [],
              selectedValues: []
            }
          : form
      )
    );
  };

  const handleValueChange = (selectedOptions, formId) => {
    const selected = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setForms(prevForms =>
      prevForms.map(form =>
        form.id === formId
          ? { ...form, selectedValues: selected }
          : form
      )
    );
  };

  const handleCheckboxChange = (formId) => {
    setForms(prevForms =>
      prevForms.map(form =>
        form.id === formId
          ? { ...form, isChecked: !form.isChecked }
          : form
      )
    );
  };

  const handleDuplicate = () => {
    setForms(prevForms => [
      ...prevForms,
      {
        id: Date.now(),
        selectedAttribute: null,
        filteredValues: [],
        selectedValues: [],
        isChecked: false
      }
    ]);
  };

  const handleRemoveForm = (formId) => {
    if (forms.length > 1) {
      setForms(prevForms => prevForms.filter(form => form.id !== formId));
    }
  };

  useEffect(() => {
    forms.forEach(form => {
      if (form.isChecked) {
        onAttributeChange(form.id, form.selectedAttribute);
        onValuesChange(form.id, form.selectedValues.map(value => ({ label: value, value })));
      }
    });
  }, [forms, onAttributeChange, onValuesChange]);

  return (
    <div className="container">
      <button type="button" className="btn btn-primary mb-3" onClick={handleDuplicate}>
        Add
      </button>
      {/* Commented out showForm check */}
      {/* {showForm && ( */}
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          {forms.map(form => (
            <div key={form.id} className="card mb-4" style={{ position: 'relative' }}>
              <div className="card-body">
                {/* Only show the CloseButton for forms that are not the first one */}
                {forms.length > 1 && (
                  <CloseButton
                    onClick={() => handleRemoveForm(form.id)}
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                  />
                )}
                <form>
                  <div className="mb-3">
                    <label htmlFor={`attributeSelect-${form.id}`} className="form-label">Select Attribute</label>
                    <Select
                      id={`attributeSelect-${form.id}`}
                      options={attributes.map(attr => ({ label: attr.name, value: attr._id }))}
                      value={form.selectedAttribute}
                      onChange={(selectedOption) => handleAttributeChange(selectedOption, form.id)}
                      placeholder="Select an attribute"
                    />
                  </div>

                  {form.filteredValues.length > 0 && (
                    <div className="mb-3">
                      <label htmlFor={`valuesSelect-${form.id}`} className="form-label">Select Values</label>
                      <Select
                        id={`valuesSelect-${form.id}`}
                        options={form.filteredValues}
                        value={form.filteredValues.filter(option => form.selectedValues.includes(option.value))}
                        onChange={(selectedOptions) => handleValueChange(selectedOptions, form.id)}
                        isMulti
                        placeholder="Select values"
                      />
                    </div>
                  )}

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`checkbox-${form.id}`}
                      checked={form.isChecked}
                      onChange={() => handleCheckboxChange(form.id)}
                    />
                    <label className="form-check-label" htmlFor={`checkbox-${form.id}`}>
                      Is Visible
                    </label>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      {/* )} */}
    </div>
  );
};

export default DropdownForm;
