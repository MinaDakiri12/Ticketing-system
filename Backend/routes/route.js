const express = require('express');
const router = express.Router();
const {logout, signin, signup} = require('../controllers/authController');
const {verificationToken} = require('../middlewares/Auth')
const {addDepartment, assignTicket, getAssignedTicket, resolvedTicket, cancelTicket, getDepartment, getTechnician, addTicket, getTicketById, getTicket, getEmployedTicket,deleteTicket,refuseTicket,acceptTicket,getAllUser} = require('../controllers/employerController')

router.post('/login', signin);
router.post('/logout', logout);

//Employer
router.post('/addTicket',verificationToken('employer'), addTicket);
router.get('/empTicket', verificationToken('employer'), getEmployedTicket);
router.delete('/deleteTicket/:id',verificationToken('employer'),deleteTicket)

//Technician
router.post('/cancelTicket/:id', verificationToken('technician'), cancelTicket);
router.post('/resolvedTicket/:id', verificationToken('technician'), resolvedTicket);
router.get('/technicianTicket', verificationToken('technician'), getAssignedTicket);



//admin 
router.post('/signup',verificationToken('admin'), signup);
router.post('/addDepartment', verificationToken('admin'), addDepartment);
router.post('/assign/:id', verificationToken('admin'), assignTicket);
router.get('/department', verificationToken('admin'), getDepartment);
router.get('/technician', verificationToken('admin'), getTechnician);
router.get('/users', verificationToken('admin'), getAllUser);
router.get('/ticket', verificationToken('admin'), getTicket);
router.get('/getTicket/:id', verificationToken('admin'), getTicketById);
router.get('/refuse/:id',  verificationToken('admin'),refuseTicket)
router.get('/accept', verificationToken('admin'), acceptTicket)



module.exports = router;