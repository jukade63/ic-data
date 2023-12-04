import React, { useState} from "react";
import axios from "axios";
import UserDetails from "./UserDetails";


const SearchPage = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = () => {
    console.log('request');
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3001/get-user/${userId}`)
      .then((response) => {
        setUserData(response.data.user);
        console.log(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data.message || 'Error fetching user');
        setLoading(false);
        setUserData(null)
      });
  };

  const handleSearch = () => {
    if (userId) {
      fetchUser();
      setUserId('')
    }
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

      {userData && <UserDetails user={userData} setUserData={setUserData} userId={userId} setUserId={setUserId}/>}
     
    </div>
  );
};

export default SearchPage;
