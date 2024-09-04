import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import { Alert } from "./Alert";

export const Profile = () => {
  const [ProfileUser, setProfileUser] = useState(null);
  const [ShowAlert, setShowAlert] = useState(false);
  const [refCopied, setRefCopied] = useState(false);
  const { user ,timedalert, setUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    });
    const resuser = await res.json();
    setProfileUser(resuser);
  };

  const handleSave = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ProfileUser.id,
        username: ProfileUser.username,
        display_name: ProfileUser.display_name,
      }),
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        timedalert("Changes have been made!", 'green');
      } else if (res.status === 409) {
        timedalert("Username already exists! Use a different username.", 'yellow');
      } else {
        timedalert("Error Saving Changes!", 'red');
      }
    });
  };

  const confirmDelete = () => {
    const isSure = window.confirm(
      "Are you sure, you want to delete the account?"
    );
    if (isSure) {
      handleDelete();
    } else {
      return;
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ProfileUser.id,
      }),
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        timedalert("You'r Profile has been deleted!", 'green');
        setUser(null);
        //window.location.reload();
      } else {
        timedalert("Error Deleting your account!", 'red');

      }
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  if (user && ProfileUser) {
    return (
      <div className="hero profile-hero">
        {ShowAlert && (
          <Alert
            Close={() => {
              setShowAlert(false);
            }}
          >
           <div className="ref-alert">
            <p className="ref-link-head">Share this link with your friends!</p>
            <div className="ref-link-div">
               <input className="ref-link" type="text" readOnly value={`${window.location.protocol + '//' + window.location.host}/auth/?mode=register&refID=${ProfileUser.refID}`}/>
            
            <button onClick={async()=>{
              navigator.clipboard.writeText(`${window.location.protocol + '//' + window.location.host}/auth/?mode=register&refID=${ProfileUser.refID}`);
              setRefCopied(true);
              const t = setTimeout(()=>{setRefCopied(false);},3000)
            }} title="copy" className="ref-link-copy-btn">
            <i class="fa-solid fa-copy"></i>
            {refCopied&&<div className="ref-notify-copy">
              Copied to clipboard!
              <div class="ref-notify-copy-tri"></div>
            </div>}
            </button>
           </div>
           </div>
          </Alert>
        )}
        <h1 className="profile-head">My Profile</h1>
        <div className="profile-container">
          <div className="profile-inp">
            <label className="profile-inp-label" htmlFor="display_name">Display Name</label>
            <input
              className="profile-text profile-disp-text"
              id="display_name"
              type="text"
              value={ProfileUser.display_name}
              onChange={(e) => {
                setProfileUser((ProfileUser) => ({
                  ...ProfileUser,
                  display_name: e.target.value,
                }));
              }}
            />
          </div>
          <div className="profile-inp">
            <label className="profile-inp-label" htmlFor="email">Email</label>
            <input
              className="profile-text profile-em-text"
              id="email"
              type="text"
              value={ProfileUser.username}
              onChange={(e) => {
                setProfileUser((ProfileUser) => ({
                  ...ProfileUser,
                  username: e.target.value,
                }));
              }}
            />
          </div>

          <button onClick={handleSave} className="profile-btn">
            Save
          </button>

          {/*<button className="profile-btn">Reset Password</button>*/}

          <button
            onClick={() => {
              setShowAlert(true);
            }}
            className="profile-btn"
          >
            Refer a friend
          </button>

          <button onClick={confirmDelete} className="profile-btn">
            Delete Profile
          </button>
          <p style={{margin: '0px'}}>for testing</p>
          <p style={{margin: '0px'}}>User ID :{ProfileUser.id}</p>
          <p style={{margin: '0px'}}>Refer ID :{ProfileUser.refID}</p>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
};
