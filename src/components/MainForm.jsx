import React, { useState } from "react";
import imagePlaceholder from "../assests/img-placeholder.svg";

function MainForm() {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    id: "",
    firstname: "",
    lastname: "",
    birthDate: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0], // Get the selected file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      id: "",
      firstname: "",
      lastname: "",
      birthDate: "",
      address: "",
    };

    // Add validation rules here
    if (formData.id.trim() === "") {
      newErrors.id = "กรุณาเลขที่บัตรประชาชน";
      valid = false;
    }
    if (formData.id.trim().length !== 13 || !parseInt(formData.id.trim()))  {
      newErrors.id = "เลขบัตรประชาชนไม่ถูกต้อง";
      valid = false;
    }
    if (formData.firstname.trim() === "") {
      newErrors.firstname = "กรุณากรอกชื่อ";
      valid = false;
    }

    if (formData.lastname.trim() === "") {
      newErrors.lastname = "กรุณากรอกนามสกุล";
      valid = false;
    }

    if (formData.birthDate.trim() === "") {
      newErrors.birthDate = "กรุณากรอกวันเกิด";
      valid = false;
    }

    if (formData.address.trim() === "") {
      newErrors.address = "กรุณากรอกที่อยู่";
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
        id: "",
        firstname: "",
        lastname: "",
        birthDate: "",
        address: "",
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  return (
    <div className="container">
      <h1>กรุณากรอกข้อมูลตามบัตรประชาชน</h1>
      <form onSubmit={handleSubmit} className="myForm">
        <section className="textForm">
        <div className="formGroup">
            <label>
              เลขที่บัตรประชาชน:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="inputField"
              />
              {errors.id && (
                <span className="errorText">{errors.id}</span>
              )}
            </label>
          </div>
          <div className="formGroup">
            <label>
              ชื่อ:
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
              นามสกุล:
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
              วันเกิด:
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
              ที่อยู่:
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
        </section>
        <section className="image-form">
          <div className="formGroup">
            <label>
              เลือกรูป:
              {formData.image ? (
                <div className="img-wrapper">
                  <div className="selectedImage">
                    <img src={formData.image} alt="Selected" width={200} />
                    {formData.image && (
                      <button onClick={removeImage} className="closeButton">
                        <span className="material-icons closeIcon">close</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="placeholder">
                  <img src={imagePlaceholder} alt="Selected" width={200} />
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="inputField"
              />
            </label>
          </div>
        </section>
        <div className="formGroup submitBtn">
          <button type="submit" className="submitButton">
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}

export default MainForm;
