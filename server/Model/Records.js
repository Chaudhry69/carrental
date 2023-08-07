const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for records schema
let Records = new Schema({
Name: {
type: String
},
cnic: {
type: String
},
carName: {
type: String
},
carModel: {
type: String
},
phone: {
type: Number
},
dateOut: {
type: Date
},
dateIn: {
type: Date
}
},{
collection: 'records'
});

module.exports = mongoose.model('Records', Records);