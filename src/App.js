import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./api/utils";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}/v1/me`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => setDisplayName(res.data.displayName))
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token");
            setToken(null);
          }
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      {token ? <h1>hello, {displayName}</h1> : <h1>simple react auth page</h1>}

      <ol>
        <li>
          <button onClick={() => navigate("/login")}>login</button>
        </li>
        <li>
          <button onClick={() => navigate("/register")}>register</button>
        </li>
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ol>
    </div>
  );
}

export default App;
