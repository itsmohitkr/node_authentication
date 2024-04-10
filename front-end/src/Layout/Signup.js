import React, { useState } from "react";

function Signup() {
  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function submitHandler(event) {
    
    event.preventDefault(); // Prevent default form submission behavior
    const response = await fetch("http://localhost:5001/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
    });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to submit form");
      }
      setFormData({...initialFormData});    
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="full_name"
          placeholder="full_name"
          onChange={changeHandler}
          value={formData.full_name}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={changeHandler}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={changeHandler}
          value={formData.password}
        />
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
