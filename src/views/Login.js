import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/v1/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
      });
  };

  return (
    <div>
      <div style={{ color: "red" }}>{feedback}</div>
      <form>
        <p>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleEmailChange}
          />
        </p>
        <p>
          <input
            type="password"
            name="pwd"
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </p>
        <p>
          <button onClick={handleLoginClick}>login</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
