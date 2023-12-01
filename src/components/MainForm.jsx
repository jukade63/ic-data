import React, { useState } from 'react'

function MainForm() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        birthDate: "",
        address: "",
      });
    
      const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        birthDate: "",
        address: "",
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validateForm = () => {
        let valid = true;
        const newErrors = {
          firstname: "",
          lastname: "",
          birthDate: "",
          address: "",
        };
    
        // Add validation rules here
        if (formData.firstname.trim() === "") {
          newErrors.firstname = "Please enter your first name.";
          valid = false;
        }
    
        if (formData.lastname.trim() === "") {
          newErrors.lastname = "Please enter your last name.";
          valid = false;
        }
    
        if (formData.birthDate.trim() === "") {
          newErrors.birthDate = "Please enter your birth date.";
          valid = false;
        }
    
        if (formData.address.trim() === "") {
          newErrors.address = "Please enter your address.";
          valid = false;
        }
    
        setErrors(newErrors);
        return valid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
    
        if (isValid) {
          // Handle form submission here
          console.log(formData);
          // Reset form fields after submission if needed
          setFormData({
            firstname: "",
            lastname: "",
            birthDate: "",
            address: "",
          });
        }
      };
    
      return (
        <div className="container">
          <h1>Fill in your IC data</h1>
          <form onSubmit={handleSubmit} className="myForm">
            <div className="formGroup">
              <label>
                First Name:
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="inputField"
                />
                {errors.firstname && (
                  <span className="errorText">{errors.firstname}</span>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="inputField"
                />
                {errors.lastname && (
                  <span className="errorText">{errors.lastname}</span>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label>
                Birth Date:
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="inputField"
                />
                {errors.birthDate && (
                  <span className="errorText">{errors.birthDate}</span>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label>
                Address:
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="inputField"
                />
                {errors.address && (
                  <span className="errorText">{errors.address}</span>
                )}
              </label>
            </div>
            <div className="formGroup">
              <button type="submit" className="submitButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}

export default MainForm