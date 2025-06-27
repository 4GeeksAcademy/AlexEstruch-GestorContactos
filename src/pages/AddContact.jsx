import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "add_contact",
      payload: contact,
    });

    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={contact.fullName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={contact.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={contact.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={contact.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">Save</button>
        <Link to="/" className="btn btn-link p-0">
          Or get back to contacts
        </Link>
      </form>
    </div>
  );
};
