import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imagePlaceholder from "../assests/img-placeholder.svg";
import axiosInstance from "../axios";
import formatDate from '../utils/dateFormat'


const UserDetails = ({ user, setShowModal, setUserData, setUserId }) => {
  const [editableFields, setEditableFields] = useState({
    id: false,
    firstname: false,
    lastname: false,
    DOB: false,
    address: false,
  });

  const [originalData, setOriginalData] = useState({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    DOB: user.DOB.slice(0, 10),
    address: user.address,
  });

  const [edited, setEdited] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const isEdited = Object.values(editableFields).some((field) => field);
    setEdited(isEdited);
    console.log(isEdited);
  }, [editableFields]);

  useEffect(() => {
    if (!inputDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputDisabled]);

  const handleInputChange = (e, fieldName) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: true,
    });
    setUserData({
      ...user,
      [fieldName]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEdited(false);
    setFile(null)
    setInputDisabled(true);
    setUserData({
      ...user,
      firstname: originalData.firstname,
      lastname: originalData.lastname,
      DOB: originalData.DOB.slice(0, 10),
      address: originalData.address,
      imageUrl: user.imageUrl,
    });
    setEditableFields({
      id: false,
      firstname: false,
      lastname: false,
      DOB: false,
      address: false,
      imageUrl: false,
    });
    setShowCancelButton(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setEdited(true)
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = (e) => {
    setFile(null);
    setImagePreview(null);
  };

  const handleUpdate = () => {

    setShowCancelButton(true);
    setInputDisabled(false);
    if (buttonText === "อัปเดท") {
      setLoading(true);
      const multiPart = new FormData();
      multiPart.append("firstname", user.firstname);
      multiPart.append("lastname", user.lastname);
      multiPart.append("DOB", user.DOB.slice(0, 10));
      multiPart.append("address", user.address);

      if (file) {
        multiPart.append("image", file);
      }

      axiosInstance
        .put(`/update-user/${user.id}`, multiPart, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("User data updated:", response.data);
          setEdited(false);
          setEditableFields({
            id: false,
            firstname: false,
            lastname: false,
            DOB: false,
            address: false,
            imageUrl: false,
          });
          setTimeout(() => {
            toast.success("แก้ไขข้อมูลสำเร็จ!");
          }, 800);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        })
        .finally(() => {
          setLoading(false);
          setInputDisabled(true);
          setShowCancelButton(false);
          setUserId("");
          buttonText = "แก้ไข";
        });
    }
  };

  let buttonText = loading ? "กำลังอัปเดท.." : edited ? "อัปเดท" : "แก้ไข";
  let imageToShow = file ? (
    <div className="selected-image">
      <img src={imagePreview} alt="Selected" />
      <button onClick={removeImage} className="close-btn">
        <span className="material-icons closeIcon">close</span>
      </button>
    </div>
  ) : user.imageUrl ? (
    <div className="image-info">
      <img src={user.imageUrl} alt="Selected" />
    </div>
  ) : (
    <div className="placeholder">
      <img src={imagePlaceholder} alt="Selected" />
    </div>
  );

  return (
    <div className="user-details">
      <h2>ผลการค้นหา</h2>

      <div className="grid">
        <div className="user-info">
          <div className="button-container">
            {showCancelButton ? (
              <button className="cancel-button" onClick={handleCancel}>
                ยกเลิก
              </button>
            ) : (
              <p></p>
            )}
            <button className="edit-button" onClick={handleUpdate}>
              {buttonText}
            </button>
          </div>
          <div className="input-container">
            <label htmlFor="">เลขที่บัตรประชาชน</label>
            <input
              className="input-field"
              type="text"
              value={user.id}
              disabled
            />
          </div>
          <div className="input-container">
            <label htmlFor="">ชื่อ</label>
            <input
              className="input-field first-name"
              type="text"
              ref={inputRef}
              value={user.firstname}
              disabled={inputDisabled}
              onChange={(e) => handleInputChange(e, "firstname")}
            />
          </div>

          <div className="input-container">
            <label htmlFor="">นามสกุล</label>
            <input
              className="input-field"
              type="text"
              value={user.lastname}
              disabled={inputDisabled}
              onChange={(e) => handleInputChange(e, "lastname")}
            />
          </div>

          <div className="input-container">
            <label htmlFor="">วันเกิด</label>
            <input
              className="input-field"
              type="date"
              value={user.DOB.slice(0, 10)}
              disabled={inputDisabled}
              onChange={(e) => handleInputChange(e, "DOB")}
            />
          </div>

          <div className="input-container">
            <label htmlFor="">ที่อยู่</label>
            <input
              className="input-field"
              type="text"
              value={user.address}
              disabled={inputDisabled}
              onChange={(e) => handleInputChange(e, "address")}
            />
          </div>
        </div>

        <div className="img-wrapper">
          <div className="img-container">
            {imageToShow}
            {!inputDisabled && (
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="inputField"
              />
            )}
            <button onClick={() => setShowModal(true)}>ลบข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
