import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import "./userHome.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const [userData, setUserData] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    axios
      .get(
        `http://localhost:5000/user/profile/${id}`,
        {},
        {
          headers: {
            accessToken: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data, "res");
        setUserData(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [accessToken]);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:5000/user/logout",
        {},
        {
          headers: {
            accessToken: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "res");
        if (res.status === 201) {
          toast.success(res.data.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user_id");
          navigate("/");
        }
      })
      .catch((error) => console.log(error, "error"));
  };

  return (
    <div className="userHome">
      <div className="sidebar">
        <div className="profileImageBox">
          <img
            src={userData.profile_image}
            alt="Profile Pic"
            className="profilePicture"
          />
        </div>
        <div className="userName">{userData.user_name}</div>
        <div className="sidebar-contents">
          <ul type="none" className="sidebar-list">
            <li className="sidebar-links">Dashboard</li>
            {/* <li className="sidebar-links">Employee</li> */}
            <li className="sidebar-links">Project</li>
            <li className="sidebar-links">Settings</li>
          </ul>
        </div>
        <div className="logoutButton">
          <Button variant="danger" onClick={handleLogout}>
            Logout <IoIosLogOut />
          </Button>
        </div>
      </div>
      <div className="mainSection">
        <div className="company-logo">
          <img
            className="companyLogoImage"
            src="https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg"
            alt="company-logo"
          />
        </div>
        <div className="user-designation">Hi, {userData.user_name}</div>
      </div>
    </div>
  );
}

export default UserHome;
