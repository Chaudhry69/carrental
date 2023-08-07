// Import important packages
const express = require('express');
const recordRoute = express.Router();

// Import the Record model
let recordModel = require('../Model/Records');

// To Get List Of Records
recordRoute.route('/').get(async function (req, res) {
    try {
      const records = await recordModel.find();
      res.json(records);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });
  recordRoute.route('/record/:id').get(async function (req, res) {
    try {
      const records = await recordModel.findById(req.params.id);
      res.json(records);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });
  
// Add New Record
recordRoute.route('/addRecord').post(function (req, res) {
  let record = new recordModel(req.body);
  record.save()
    .then(() => {
      res.status(200).json({ 'record': 'Record Added Successfully' });
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});



// Get Record Details By ID

recordRoute.route('/editRecord/:id').put(async function (req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Check if the request body contains any data to update
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).send("No data provided for update");
    }

    // Find the existing record by ID and update the data
    const record = await recordModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the record exists
    if (!record) {
      return res.status(404).send("Record not found");
    }

    res.json('Record Updated Successfully');
  } catch (err) {
    res.status(400).send("Unable To Update Record");
  }
});













//   let id = req.params.id;
//   recordModel.findById(id, function (err, record) {
//     if (err) {
//       res.status(400).send("Unable To Find Record");
//     } else {
//       res.json(record);
//     }recordRoute.route('/editRecord/:id').get(function (req, res) {

//   });
// });

recordRoute.route('/updateRecord/:id').post(async function (req, res) {
  try {
    const record = await recordModel.findById(req.params.id);
    if (!record)
      return res.status(404).send('Unable To Find Record With This ID');

    record.Name = req.body.Name;
    record.cnic = req.body.cnic;
    record.carName = req.body.carName;
    record.carModel = req.body.carModel;
    record.phone = req.body.phone;
    record.dateOut = req.body.dateOut;
    record.dateIn = req.body.dateIn;

    await record.save();

    res.json('Record Updated Successfully');
  } catch (err) {
    res.status(400).send("Unable To Update Record");
  }
});

// Delete Record
recordRoute.route('/deleteRecord/:id').delete(async function (req, res) {
  try {
    const record = await recordModel.findByIdAndRemove({ _id: req.params.id });
    if (!record)
      return res.status(404).send("Record not found");

    res.json('Record Deleted Successfully');
  } catch (err) {
    res.status(400).send("Unable To Delete Record");
  }
});


module.exports = recordRoute;
