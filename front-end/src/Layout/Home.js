import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch("http://localhost:5001/home", {
        credentials: "include",
      });
      const fetchedData = await response.json();
      setData(fetchedData.data);
    }

    // Load users only when errorMessage changes
    loadUsers();
  }, []); // Include navigate as a dependency

  // Redirect to login page if errorMessage is set and matches the specific message
 
  


  if (data) {
    return (
      <div>
        <h3>Home page</h3>
        <p>{data}</p>
      </div>
    );
  } else {
    navigate("/login")  
  }
}

export default Home;
