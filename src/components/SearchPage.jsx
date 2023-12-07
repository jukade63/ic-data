import React, { useState } from "react";
import UserDetails from "./UserDetails";
import axiosInstance from "../axios";
import ConfirmModal from "./ComfirmModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateID from '../utils/validateID' //more concrete validation

const SearchPage = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUser = () => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get(`/get-user/${userId}`)
      .then((response) => {
        setUserData(response.data.user);
        console.log("user", response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("ไม่พบรายชื่อ");
        } else {
          setError("An error occurred while fetching user data");
        }
        setLoading(false);
        setUserData(null);
      });
  };

  const validateIDNumber = (idNumber) => {
    const thaiIDPattern = /^[0-9]{13}$/;
    return thaiIDPattern.test(idNumber);
  }

  const handleSearch = () => {
    console.log(userId);
    if (validateIDNumber(userId)) {
      fetchUser();
    }else{
      setTimeout(() => {
        toast.error("กรุณากรอกคำค้นหาให้ถูกต้อง");
      }, 500);
    }
  };

  const handleUserDelete = async () => {
    console.log(userData);
    try {
      const response = await axiosInstance.delete(
        `/delete-user/${userData.id}?imageUrl=${userData.imageUrl}`
      );

      if (response.status === 200) {
        console.log("User deleted successfully");
        setShowModal(false);
        setUserData(null);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  let buttonText = loading ? "กำลังค้นหา.." : 'ค้นหา'

  return (
    <div>
      <div className="search-container">
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <button className="home-link">
            <span class="material-icons">keyboard_arrow_left</span>
            กลับไปหน้าลงทะเบียน
          </button>
        </Link>
        <div className="search-form">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="กรอกเลขบัตรประชาชน 13 หลัก..."
          />
          <button className={loading ? 'search-btn btn-disabled' : 'search-btn'} onClick={handleSearch}>{buttonText}</button>
        </div>
      </div>

      {userData ? (
        <UserDetails
          user={userData}
          setUserData={setUserData}
          userId={userId}
          setUserId={setUserId}
          setShowModal={setShowModal}
        />
      ) : (
        <div className="not-found">
          <h3>{error}</h3>
        </div>
      )}
      {showModal && (
        <div className="overlay">
          <ConfirmModal onDelete={handleUserDelete} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
