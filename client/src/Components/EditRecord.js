import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const customStyle = {
  width: "300px",
  margin: "0 auto",
};

const EditRecord = () => {
  const [formData, setFormData] = useState({
    Name: "",
    cnic: "",
    carName: "",
    carModel: "",
    phone: "",
    dateOut: "",
    dateIn: "",
  });

  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    getRecordById();
  }, []);

  const getRecordById = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/record/${id}`);
      const record = response.data;
      setFormData({
        ...record,
      });
    } catch (error) {
      console.log(error);
      console.log("Heavy error");
    }
  };

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
      await axios.put(`http://localhost:4000/api/editRecord/${id}`, formData);
      console.log("Record updated successfully");
      navigate("/list");
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = formattedDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
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
            placeholder={formData.cnic}
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
            value={formatDate(formData.dateOut)}
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
            value={formatDate(formData.dateIn)}
            onChange={handleChange}
            className="form-control"
          />
        </label>
        <br />
        <input type="submit" value="Submit" className="btn btn-primary" />
        <Link to="/list" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditRecord;
