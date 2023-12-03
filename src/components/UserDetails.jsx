import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = ({ user, userId, setUserData, setUserId }) => {
  const [editableFields, setEditableFields] = useState({
    id: false,
    firstname: false,
    lastname: false,
    DOB: false,
    address: false,
  });
  // const [updatedUserData, setUpdatedUserData] = useState({
  //   id: user.id,
  //   firstname: user.firstname,
  //   lastname: user.lastname,
  //   DOB: user.DOB.slice(0, 10),
  //   address: user.address,
  // });

  const [edited, setEdited] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isEdited = Object.values(editableFields).some((field) => field);
    setEdited(isEdited);
    console.log(isEdited);
  }, [editableFields]);

// useEffect(()=>{
//   setUserData(user)
// },[userId])
  const handleInputChange = (e, fieldName) => {
    setEditableFields({
      ...editableFields,
      [fieldName]: true
    });
    setUserData({
      ...user,
      [fieldName]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEdited(false);
    setInputDisabled(true);
    setUserData({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      DOB: user.DOB.slice(0, 10),
      address: user.address,
    });
    setEditableFields({
      id: false,
      firstname: false,
      lastname: false,
      DOB: false,
      address: false,
      photoUrl: false,
      // Reset other user data fields if needed
    });
    setShowCancelButton(false);
  };

  const handleUpdate = () => {
    setShowCancelButton(true);
    setInputDisabled(false);
    if (buttonText === "อัปเดท") {
      console.log(user);
      setLoading(true);
      axios
        .put(`http://localhost:3001/update-user/${user.id}`, {...user, DOB:user.DOB.slice(0,10)})
        .then((response) => {
          console.log("User data updated:", response.data);
          setEdited(false);
          setEditableFields({
            id: false,
            firstname: false,
            lastname: false,
            DOB: false,
            address: false,
            photoUrl: false,
          });
          setTimeout(() => {
            toast.success("แก้ไขข้อมูลสำเร็จ!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }, 600);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        })
        .finally(() => {
          setLoading(false);
          setInputDisabled(true);
          setShowCancelButton(false);
          setUserId("");
        });
    }
  };

  const buttonText = loading ? "กำลังอัปเดท.." : edited ? "อัปเดท" : "แก้ไข";

  return (
    <div className="user-details">
      <h2>ผลการค้นหา</h2>
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
      <div className="user-info">
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
            className="input-field"
            type="text"
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
            type="text"
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
        <img src={user.imageUrl} alt="" />
      </div>
    </div>
  );
};

export default UserDetails;
