const express = require('express');
const router = express.Router();
const {logout, signin, signup} = require('../controllers/authController');
const {verificationToken} = require('../middlewares/Auth')
const {addDepartment, assignTicket, getAssignedTicket, resolvedTicket, cancelTicket, getDepartment, getTechnician, addTicket, getTicketById, getTicket} = require('../controllers/employerController')

router.post('/login', signin);
router.post('/signup',verificationToken('admin'), signup);
router.post('/logout', logout);
router.post('/addDepartment', verificationToken('admin'), addDepartment);
router.post('/assign', verificationToken('admin'), assignTicket);
router.post('/addTicket', verificationToken('employer'), addTicket);
router.post('/cancelTicket/:id', verificationToken('technician'), cancelTicket);
router.post('/resolvedTicket/:id', verificationToken('technician'), resolvedTicket);
router.get('/technicianTicket', verificationToken('technician'), getAssignedTicket);
router.get('/department', verificationToken('admin'), getDepartment);
router.get('/technician', verificationToken('admin'), getTechnician);
router.get('/ticket', verificationToken('admin'), getTicket);
router.get('/ticket/:id', verificationToken('admin'), getTicketById);


module.exports = router;