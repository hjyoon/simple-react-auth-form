import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/utils";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/v1/register`, {
      email,
      password,
      confirmPassword,
      displayName,
    });
  };

  return (
    <div>
      <div style={{ color: "red" }}>{feedback}</div>
      <form action="/auth/register_process" method="post">
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
            name="password"
            placeholder="password"
            onChange={handlePasswordChange}
          />
        </p>
        <p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            onChange={handleConfirmPasswordChange}
          />
        </p>
        <p>
          <input
            type="text"
            name="displayName"
            placeholder="display name"
            onChange={handleDisplayNameChange}
          />
        </p>
        <p>
          <button onClick={handleRegisterClick}>register</button>
        </p>
      </form>
    </div>
  );
}

export default Register;
