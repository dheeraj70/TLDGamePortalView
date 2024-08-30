import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Profile = () => {
  const [ProfileUser, setProfileUser] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchProfile = async () => {

      const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        credentials: "include",
      });
      const resuser = await res.json();
      setProfileUser(resuser);

  };

  useEffect(() => {
    fetchProfile();
  }, []);
  if (user && ProfileUser) {
    return <div className="hero">{`${ProfileUser.username}`}</div>;
  } else {
    navigate("/");
  }
};
