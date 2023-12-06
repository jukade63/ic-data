import React, { useState } from "react";
import UserDetails from "./UserDetails";
import axiosInstance from "../axios";
import ConfirmModal from "./ComfirmModal";

const SearchPage = () => {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUser = () => {
    console.log("request");
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
        setError(error.response?.data.message || "Error fetching user");
        setLoading(false);
        setUserData(null);
      });
  };

  const handleSearch = () => {
    if (userId) {
      fetchUser();
      setUserId("");
    }
  };

  const handleUserDelete = async () => {
    console.log(userData);
    try {
      const response = await axiosInstance.delete(`/delete-user/${userData.id}?imageUrl=${userData.imageUrl}`);

      if (response.status === 200) {
        console.log('User deleted successfully');
        setShowModal(false);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user IC number..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {userData && (
        <UserDetails
          user={userData}
          setUserData={setUserData}
          userId={userId}
          setUserId={setUserId}
          setShowModal={setShowModal}
        />
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
