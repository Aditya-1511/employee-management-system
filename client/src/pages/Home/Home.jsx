import React, { useState } from "react";
import "./home.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [email_address, setEmailAddress] = useState();
  const [password, setPassword] = useState();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [reg_email_address, setRegisterEmailAddress] = useState();
  const [reg_password, setRegPassword] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [phone_number, setPhoneNumber] = useState();
  const [role, setRole] = useState();
  const [dob, setDob] = useState();
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [placeOfIssue, setPlaceOfIssue] = useState();
  const [idCardNumber, setIdCardNumber] = useState();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCloseForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleLogin = () => {
    // Add your login logic here
    axios
      .post("http://localhost:5000/user/login", {
        email_address: email_address,
        password: password,
      })
      .then((res) => {
        console.log(res, "res");
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user_id", res.data.user._id);
        if (res.status === 200) {
          toast.success("Login successful");
        }
        if (res.data.user.user_type === 1) {
          navigate("/admin");
        }
        if (res.data.user.user_type === 3) {
          navigate("/userHome");
        }
      })
      .catch((error) => {
        toast.error("Error logging in. Please check your credentials.");
        console.error("Error fetching data:", error);
      });
    // console.log("Perform login logic");
    // toast.error("Error logging in. Please check your credentials.");
    // After successful login, you might want to redirect or perform other actions
    handleCloseForm();
  };

  const handleRegister = () => {
    setShowLoginForm(false); // Close login form when opening registration form
    setShowRegisterForm(true);
  };

  const handleRegisterSubmit = () => {
    // Registration logic
    axios
      .post("http://localhost:5000/user/signup", {
        email_address: reg_email_address,
        password: reg_password,
        user_name: name,
        gender: gender,
        date_of_birth: dob,
        phone_number: phone_number,
        role: role,
        bank_account_number: bankAccountNumber,
        place_of_issue: placeOfIssue,
        id_card_number: idCardNumber,
      })
      .then((res) => {
        // Handle registration success
        toast.success("Registration successful");
        // Additional logic if needed
      })
      .catch((error) => {
        // Handle registration error
        toast.error("Error registering. Please try again.");
        console.error("Error registering user:", error);
      });

    // Close the registration form modal
    setShowRegisterForm(false);
  };

  return (
    <div className="landingPage">
      <img
        className="compnyLogoImage"
        src="https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png"
        alt="company-logo"
      />
      <h1 className="headingLanding">Welcome to Employee Management System</h1>
      <div className="buttonsBox">
        <br />
        <h3 className="loginText">Please click below to Login</h3>
        <div className="buttons">
          <div className="adminButton">
            <Button variant="danger" onClick={handleButtonClick}>
              Admin
            </Button>
          </div>
          <div className="userButton">
            <Button variant="success" onClick={handleButtonClick}>
              Employee
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showLoginForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <h5>
              New employee ? Click{" "}
              <Button variant="warning" onClick={handleRegister}>
                Register
              </Button>{" "}
              to sign up
            </h5>
            <br />
            <Button variant="success" onClick={handleLogin}>
              Login
            </Button>{" "}
            &nbsp;
            <Button variant="secondary" onClick={handleCloseForm}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showRegisterForm}
        onHide={() => setShowRegisterForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={10}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDateOfBirth">
              <Form.Label>Date Of Birth:</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRole">
              <Form.Label>Role:</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicIdCardNumber">
              <Form.Label>ID Card Number:</Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={12}
                onChange={(e) => setIdCardNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPlaceOfIssue">
              <Form.Label>Place of Issue:</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setPlaceOfIssue(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBankAccountNumber">
              <Form.Label>Bank Account Number:</Form.Label>
              <Form.Control
                type="text"
                required
                maxLength={15}
                onChange={(e) => setBankAccountNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={(e) => setRegisterEmailAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                required
                maxLength={15}
                minLength={8}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="success" onClick={handleRegisterSubmit}>
              Register
            </Button>{" "}
            &nbsp;
            <Button
              variant="secondary"
              onClick={() => setShowRegisterForm(false)}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
