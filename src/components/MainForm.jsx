import React, { useState } from "react";
import imagePlaceholder from "../assests/img-placeholder.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios";

function MainForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    DOB: "",
    address: "",
  });
  const [loading, setLoading] = useState(false)

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({
    id: "",
    firstname: "",
    lastname: "",
    DOB: "",
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
      id: "",
      firstname: "",
      lastname: "",
      DOB: "",
      address: "",
    };

    // Validation rules
    if (formData.id.trim() === "") {
      newErrors.id = "กรุณากรอกเลขที่บัตรประชาชน";
      valid = false;
    }
    if ((formData.id.trim().length !== 13) | !parseInt(formData.id.trim())) {
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

    if (formData.DOB.trim() === "") {
      newErrors.DOB = "กรุณากรอกวันเกิด";
      valid = false;
    }

    if (formData.address.trim() === "") {
      newErrors.address = "กรุณากรอกที่อยู่";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    const multiPart = new FormData();
    console.log(formData);
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        multiPart.append(key, formData[key]);
      }
    }
    multiPart.append("image", file);

    if (isValid) {
      setLoading(true)
      try {
        await axiosInstance.post("/add-user", multiPart, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Form submitted successfully!");
        setTimeout(() => {
          toast.success("ลงทะเบียนสำเร็จ!");
        }, 500);

        setTimeout(() => {
          navigate("/search");
        }, 2000);
      } catch (error) {
        console.error("Error uploading file or submitting form:", error);
      } finally{
        setLoading(false)
      }

      setFormData({
        id: "",
        firstname: "",
        lastname: "",
        DOB: "",
        address: "",
      });
      setFile(null);
    }
  };

  const handleImageChange = (e) => {
    console.log("image input:", e.target);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = (e) => {
    console.log("close button:", e.target);
    setFile(null);
    setImagePreview(null);
  };

  let buttonText = loading ? "กำลังดำเนินการ.." : 'ลงทะเบียน'

  return (
    <div className="container">
      <h1>กรุณากรอกข้อมูลเพื่อลงทะเบียน</h1>
      <form onSubmit={handleSubmit} className="myForm">
        <section className="text-form">
          <div className="form-group">
            <label>
              เลขที่บัตรประชาชน:
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.id && <span className="error-text">{errors.id}</span>}
            </label>
          </div>
          <div className="form-group">
            <label>
              ชื่อ:
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.firstname && (
                <span className="error-text">{errors.firstname}</span>
              )}
            </label>
          </div>
          <div className="form-group">
            <label>
              นามสกุล:
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.lastname && (
                <span className="error-text">{errors.lastname}</span>
              )}
            </label>
          </div>
          <div className="form-group">
            <label>
              วันเกิด:
              <input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                className="input-field"
              />
              {errors.DOB && <span className="error-text">{errors.DOB}</span>}
            </label>
          </div>
          <div className="form-group">
            <label>
              ที่อยู่:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field"
                rows={4}
              />
              {errors.address && (
                <span className="error-text">{errors.address}</span>
              )}
            </label>
          </div>
        </section>
        <section className="image-form">
          <label>เลือกรูป:</label>
          {file ? (
            <div className="img-wrapper">
              <div className="selected-image">
                <img src={imagePreview} alt="Selected" />
                {file && (
                  <button onClick={removeImage} className="close-btn">
                    <span className="material-icons closeIcon">close</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <img src={imagePlaceholder} alt="Selected" />
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="input-field"
          />
        </section>
        <div className="submit-btn">
          <button type="submit" className={loading ? 'btn-disabled' : ''}>{buttonText}</button>
          <Link to="/search" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <button className="search-link">ไปหน้าค้นหารายชื่อ <span class="material-icons">keyboard_arrow_right</span></button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default MainForm;
