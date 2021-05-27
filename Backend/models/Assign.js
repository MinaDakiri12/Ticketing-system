const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const d = new Date();
let month = d.getMonth() + 1;
if (month < 10) month = `0${month}`;
let day = d.getDate();
if (day < 10) day = `0${day}`;
const dt = `${d.getFullYear()}-${month}-${day}`;  

const assignSchema = Schema({
    id_ticket: {type: Schema.Types.ObjectId, ref: 'Ticket'},
    id_technician: {type: Schema.Types.ObjectId, ref: 'Employer'},
    date:{type: String, default: dt},
},
{timestamps: true})

module.exports = model('Assign', assignSchema)