import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const customStyle = {
  width: "300px",
  margin: "0 auto",
};

const AddRecord = () => {
  const [formData, setFormData] = useState({
    Name: "",
    cnic: "",
    carName: "",
    carModel: "",
    phone: "",
    dateOut: "",
    dateIn: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/addRecord", formData);
      console.log("Record added successfully");
      window.location.href = "/list";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form style={customStyle} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="Name"
            type="text"
            value={formData.Name}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          CNIC
          <input
            name="cnic"
            type="text"
            value={formData.cnic}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Car Name
          <input
            name="carName"
            type="text"
            value={formData.carName}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Car Model
          <input
            name="carModel"
            type="text"
            value={formData.carModel}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Phone
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Date Out
          <input
            name="dateOut"
            type="date"
            value={formData.dateOut}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Date In
          <input
            name="dateIn"
            type="date"
            value={formData.dateIn}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <input type="submit" value="Submit" className="btn btn-primary" />
        <Link to="/" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddRecord;
