import React, { useState, useEffect } from "react";
import "../../Assets/css/profile.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
  const dateStr = user.createdAt;
  const date = new Date(dateStr);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const [data, setData] = useState({
    name: user.name,
    username: user.username,
    phone: user.phone,
    address: user.address,
    uniqueId: user.uniqueId,
  });

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/borrowedBooks/${user.username}`);
      setBorrowedBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      toast.error("Failed to fetch borrowed books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/updateUser`, data);
      const message = response.data.msg;
      const status = response.status;

      if (status === 200) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true,
          textAlign: "center",
        });
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1500);
      } else if (status === 202) {
        toast.warn(message, {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true,
          textAlign: "center",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user information");
    }
  };

  return (
    <div style={{ paddingBlockStart: "4rem" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div
            style={{
              margin: "1rem",
              borderRadius: "2rem 2rem 2rem 2rem",
              backgroundColor: "#3d5a80",
              padding: "1rem",
              boxShadow: "1px 1px 21px -3px rgba(0,0,0,0.75)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              ></div>
            </div>
            <div>
              <img
                style={{ width: "15rem" }}
                src={`https://api.multiavatar.com/${user.name}.png?apikey=dIwKHchoCn6x9k`}
                alt="User Avatar"
              />
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "1rem",
                fontWeight: "600",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              {user.name}
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              UID : <span>{user.uniqueId}</span>
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              Email : {user.username}
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              Phone : {user.phone}
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              Joined on <span style={{ color: "#a0a2a1" }}>{formattedDate}</span>
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              {isLoading ? (
                <span>Loading borrowed books...</span>
              ) : borrowedBooks.length > 0 ? (
                <span>
                  <span style={{ color: "#2bea2b" }}>{borrowedBooks.length}</span> books borrowed
                </span>
              ) : (
                <span>Nothing <span style={{ color: "#2bea2b" }}>Borrowed</span></span>
              )}
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBlockStart: "0.5rem",
                fontWeight: "600",
                fontSize: "1rem",
                color: "white",
              }}
            >
              <span style={{ color: "yellow" }}> {user.cart.length} </span> items in{" "}
              <a
                style={{ color: "#539cda", textDecoration: "none" }}
                href="/cart"
              >
                cart
              </a>
            </div>
          </div>
        </div>
        <div style={{ flex: "3", display: "flex", flexDirection: "column" }}>
          <div>
            <div
              style={{
                margin: "1rem",
                backgroundColor: "white",
                borderRadius: "2rem",
                boxShadow: "1px 1px 21px -3px rgba(0,0,0,0.75)",
              }}
            >
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "1rem 0 0 1rem",
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "poppins",
                }}
              >
                Edit Your Profile
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "60%" }}
                  type="text"
                  className="login-input"
                  name="name"
                  placeholder="Name"
                  defaultValue={user.name}
                  onChange={handleInputs}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "60%" }}
                  type="email"
                  className="login-input"
                  name="username"
                  placeholder="Email"
                  defaultValue={user.username}
                  onChange={handleInputs}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem",
                }}
              >
                <input
                  style={{ width: "30%" }}
                  type="number"
                  className="login-input"
                  name="phone"
                  defaultValue={user.phone}
                  placeholder="Phone"
                  onChange={handleInputs}
                />
              </div>
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "0.5rem 0.5rem 2rem 0.5rem",
                }}
              >
                <input
                  style={{ width: "90%" }}
                  type="text"
                  className="login-input"
                  name="address"
                  placeholder="Address"
                  defaultValue={user.address}
                  onChange={handleInputs}
                />
                <span onClick={submitForm} className="profile-button">
                  Update
                </span>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                margin: "1rem",
                backgroundColor: "white",
                borderRadius: "2rem",
                boxShadow: "1px 1px 21px -3px rgba(0,0,0,0.75)",
              }}
            >
              <div
                style={{
                  margin: "0.5rem",
                  display: "flex",
                  padding: "1rem 0 0 1rem",
                  fontSize: "2rem",
                  fontWeight: "600",
                  fontFamily: "poppins",
                }}
              >
                Borrowed Books
              </div>
              {isLoading ? (
                <div style={{ margin: "0.5rem", padding: "0.5rem" }}>Loading borrowed books...</div>
              ) : borrowedBooks.length > 0 ? (
                borrowedBooks.map((book, index) => (
                  <div key={index} style={{ margin: "0.5rem", padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                    <div style={{ fontWeight: "bold" }}>{book.title}</div>
                    <div>by {book.author}</div>
                    <div>Borrowed on: {new Date(book.takenDate).toLocaleDateString()}</div>
                    <div>Due on: {new Date(book.dueDate).toLocaleDateString()}</div>
                  </div>
                ))
              ) : (
                <div style={{ margin: "0.5rem", padding: "0.5rem" }}>
                  No books currently borrowed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;