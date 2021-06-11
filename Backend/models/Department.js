const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const departmentSchema = Schema({
    name: {type: String, min:3, max: 100, require: true},
    responsible: {type: String, min:3, max: 100, require: true}
})

module.exports = model('Department', departmentSchema)