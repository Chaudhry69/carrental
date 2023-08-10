import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";
import "../App.css";

const divStyle = {
  margin: "5% 8%",
};

function ListRecords({ loggedIn }) {
  const [records, setRecords] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getRecordList();
  }, []);

  const getRecordList = () => {
    axios
      .get("http://localhost:4000/api/records")
      .then((response) => {
        console.log(response);
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRecord = (recordId) => {
    axios
      .delete(`http://localhost:4000/api/deleteRecord/${recordId}`)
      .then(() => {
        getRecordList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filterRecords = () => {
    return records.filter(
      (record) =>
        record.Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        record.cnic.includes(searchInput)
    );
  };

  const formattedRecords = filterRecords().map((record, i) => {
    const formattedDateOut = new Date(record.dateOut)
      .toISOString()
      .split("T")[0];
    const formattedDatein = new Date(record.dateIn).toISOString().split("T")[0];
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{record.Name}</td>
        <td>{record.cnic}</td>
        <td>{record.carName}</td>
        <td>{record.carModel}</td>
        <td>{record.phone}</td>
        <td>{formattedDateOut}</td>
        <td>
          {formattedDatein ? (
            <span>{formattedDatein}</span>
          ) : (
            <span className="not-returned">Not yet returned</span>
          )}
        </td>
        <td>
          {loggedIn && (
            <Link to={`/editRecord/${record._id}`} className="btn btn-primary">
              Edit Record
            </Link>
          )}
        </td>
        <td>
          {loggedIn && (
            <Button
              onClick={() => deleteRecord(record._id)}
              className="btn btn-danger"
            >
              Delete
            </Button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div style={divStyle}>
      <input
        type="text"
        placeholder="Search by Name or CNIC"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="searchBar"
      />
      <Table responsive className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>CNIC</th>
            <th>Car Name</th>
            <th>Car Model</th>
            <th>Phone</th>
            <th>Date Out</th>
            <th>Date In</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{formattedRecords}</tbody>
      </Table>
    </div>
  );
}

export default ListRecords;