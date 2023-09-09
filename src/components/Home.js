import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [email, setName] = useState("");
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user-profile");
        // console.log(data);
        setName(data.email);
      } catch (e) {
        setNavigate(true);
      }
    })();
  }, []);

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {email}</h3>
    </div>
  );
};

export default Home;
