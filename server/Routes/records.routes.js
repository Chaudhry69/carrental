const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config()
const User = require('../Model/user'); // Import the User schema

const recordRoute = express.Router();
recordRoute.use(bodyParser.json());
recordRoute.use(cors());


//Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "2d" });
};


// Signup route
recordRoute.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Login route
recordRoute.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({_id: newUser.id,
      token: generateToken()});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Import the Record model
let recordModel = require('../Model/Records');

// To Get List Of Records
recordRoute.route('/records').get(async function (req, res) {
    try {
      const records = await recordModel.find();
      res.json(records);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

  //record by id/single record
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