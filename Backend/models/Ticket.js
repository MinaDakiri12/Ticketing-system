const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const d = new Date();
let month = d.getMonth() + 1;
if (month < 10) month = `0${month}`;
let day = d.getDate();
if (day < 10) day = `0${day}`;
const dt = `${d.getFullYear()}-${month}-${day}`;  

const ticketSchema = Schema({
    title: {type: String, min:6, max: 100, require: true},
    type: {type: String, min:4, max: 100, require: true},
    emergency: {type: String, ennum: ['normal', 'medium', 'urgent'], default: 'normal'},
    description: {type: String, min:10, max: 1024, require: true},
    etat: {type: String, ennum:['waiting', 'assigned', 're-waiting', 're-assigned', 'resolved'], default: 'waiting'},
    date:{type: String, default: dt},
    id_employer: {type: Schema.Types.ObjectId, ref: 'Employer'},
},
{timestamps: true})

module.exports = model('Ticket', ticketSchema)