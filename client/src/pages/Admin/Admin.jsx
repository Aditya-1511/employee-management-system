import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import "./admin.css";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewProfileModal({ show, handleClose, userData }) {
  return (
    <Modal className="viewProfileModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">View information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <img
            className="profileImage"
            src={userData.profile_image}
            alt="User profile"
          />
        </div>
        <div
          className="userData"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              // backgroundColor: "gray",
              width: "10vw",
              height: "4vh",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: "15px",
            }}
          >
            Name: {userData.user_name}
          </div>
          <div
            style={{
              // backgroundColor: "gray",
              width: "10vw",
              height: "4vh",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginTop: "5px",
            }}
          >
            ID: {userData.emp_ID}
          </div>
          <div>Date of Birth: {userData.date_of_birth}</div>
          <div>Phone Number: {userData.phone_number}</div>
          <div>Role: {userData.role}</div>
          <div>Place of issue: {userData.place_of_issue}</div>
          <div>Bank Account Number: {userData.bank_account_number}</div>
          <div>Gender: {userData.gender}</div>
          <div>ID Card Number: {userData.id_card_number}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Admin() {
  const [userData, setUserData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [viewProfileModalShow, setViewProfileModalShow] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/userList", {
        headers: {
          accessToken: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          console.log("API Response:", response);
          setUserData(response.data.result);
        } else {
          toast.error("You need to login first.");
          navigate("/");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [accessToken, navigate]);

  const handleViewProfile = (user) => {
    setSelectedUserData(user);
    setViewProfileModalShow(true);
  };

  const handleCloseProfileModal = () => {
    setViewProfileModalShow(false);
  };

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

  const handleDelete = (id) => {
    // console.log(id, "--->>id");
    axios
      .post(
        `http://localhost:5000/user/delete/${id}`,
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
          // console.log(res.data.message);
          toast.success(res.data.message);
          setUserData((prevUserData) =>
            prevUserData.filter((user) => user._id !== id)
          );
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <div className="adminHome">
      <div className="sidebar">
        <div className="profileImageBox">
          <img
            className="profilePicture"
            src="https://images.freeimages.com/variants/59tZ1h89y8fuRnBcqUuUjEWo/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
            alt="profile-pic"
          />
        </div>
        <div className="userName">Aditya Pandey</div>
        <div className="sidebar-contents">
          <ul type="none" className="sidebar-list">
            <li className="sidebar-links">Dashboard</li>
            <li className="sidebar-links">Employee</li>
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
        <div className="user-designation-admin">Hi,Admin</div>
        <div className="searchBox">
          <input
            className="search"
            type="text"
            placeholder="Search: name, id,..."
          />
        </div>
        <div className="user-table">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Dob</th>
                <th>Phone</th>
                <th>Role</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.emp_ID}</td>
                  <td>{user.user_name}</td>
                  <td>{user.date_of_birth}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.role}</td>
                  <td className="moreButtons">
                    <Button
                      variant="warning"
                      onClick={() => handleViewProfile(user)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="pagination">
          <div className="pageNumber">Show 4 of 200 results</div>
          <div className="pageNumBox">Page </div>
        </div>
      </div>
      <ViewProfileModal
        show={viewProfileModalShow}
        handleClose={handleCloseProfileModal}
        userData={selectedUserData}
      />
    </div>
  );
}

export default Admin;
