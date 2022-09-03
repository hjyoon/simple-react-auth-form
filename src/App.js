import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./api/utils";

function App() {
  const [access, setAccess] = useState(localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh"));
  const [displayName, setDisplayName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (access) {
      axios
        .get(`${BASE_URL}/v1/me`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((res) => setDisplayName(res.data.displayName))
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("access");
            setAccess(null);
          }
        });
    }
  }, [access]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
  };

  return (
    <div>
      {access ? <h1>hello, {displayName}</h1> : <h1>simple react auth page</h1>}

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
