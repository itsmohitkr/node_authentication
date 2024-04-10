import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialFormData = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ ...initialFormData });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function submitHandler(event) {
    event.preventDefault(); // Prevent default form submission behavior
   await fetch("http://localhost:5001/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: formData }),
   })
    navigate("/");
  }

  return (
    <div>
      <form>
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

export default Login;
