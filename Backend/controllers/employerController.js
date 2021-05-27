const Ticket = require('../models/Ticket');
const Assign = require('../models/Assign');
const Employer = require('../models/Employer');
const { ticketValidation, departmentValidation } = require('../validation/validation');
const Department = require('../models/Department');

//Department
exports.addDepartment = async (req, res) => {
    const { error } = departmentValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);
    try {
        const department = new Department({
            ...req.body
        })
        const findDepartment = await Department.findOne({ name: department.name })
        if (findDepartment) {
            return res.status(400).json(`Department already exist!`)
        } else {
            department.save();
            return res.status(201).json(department);
        }
    } catch (error) {
        throw Error(error)
    }
}

exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.find();
        if (department) return res.status(200).json(department)
    } catch (error) {
        throw Error(error)
    }
}

//Technician

exports.getTechnician = async (req, res) => {
    try {
        const technician = await Employer.find({ type: 'technician' }).select('-password');
        if (technician) return res.status(200).json(technician)

    } catch (error) {
        throw Error(error)
    }
}

//Ticket

exports.addTicket = async (req, res) => {
    const { error } = ticketValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);
    try {
        const ticket = new Ticket({
            ...req.body,
            id_employer: res.auth._id,
        });
        const saveTicket = await ticket.save();
        if (saveTicket) return res.status(201).json(saveTicket)
    } catch (error) {
        throw Error(error)
    }
}

exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.find();
        if (ticket.length > 0) {
            return res.status(200).json(ticket)
        } else {
            return res.status(404).json('There is no ticket')
        }
    } catch (error) {
        throw Error(error)
    }
}

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (ticket) return res.status(200).json(ticket)
    } catch (error) {
        throw Error(error)
    }
}

// Ticket employer 

exports.getEmployedTicket = async (req, res) => {
    try {
        const ticket = await Ticket.find({ id_employer: res.auth._id });
        if (ticket.length > 0) {
            return res.status(200).json(ticket)
        } else {
            return res.status(404).json('There is no ticket')
        }
    } catch (error) {
        throw Error(error)
    }
}

//Ticket assign Admin

exports.assignTicket = async (req, res) => {
    try {
        const { id_technician, id_ticket } = req.body;
        console.log('req body', req.body)
        const technician = await Employer.findOne({  _id: id_technician })
        const findTicket = await Assign.findOne({ _id: id_ticket }).populate('id_ticket');
        console.log('find ticket', findTicket)

        if (findTicket === null) {
            const assign = new Assign({
                id_ticket: id_ticket,
                id_technician: technician._id
            })
            const updated = await Ticket.findByIdAndUpdate({ _id: id_ticket }, { etat: 'assigned' });
            const assigned = await assign.save()
            if (assigned && updated) return res.status(201).json(assign)
        } else {
            if (findTicket.id_ticket._id == id_ticket &&
                findTicket.id_technician == (technician._id).toString() &&
                (findTicket.id_ticket.etat == 'assigned' || findTicket.id_ticket.etat == 're-assigned')) {
                return res.status(400).json(`ticket already assigned to ${technician. id_technician }`)
            }
            const assign = new Assign({
                id_ticket : id_ticket,
                id_technician: technician._id
            })
            if (findTicket.id_ticket.etat == 'waiting') {
                await Ticket.findByIdAndUpdate({ _id: id_ticket }, { etat: 'assigned' });

            }
            if (findTicket.id_ticket.etat == 're-waiting') {
                await Ticket.findByIdAndUpdate({ _id: id_ticket }, { etat: 're-assigned' });
            }
            const assigned = await assign.save()
            if (assigned) return res.status(201).json(assign)
        }
    } catch (error) {
        throw Error(error)
    }

}

// Ticket assign Technician
exports.getAssignedTicket = async (req, res) => {
    try {
        const ticket = await Assign.find({ id_technician: res.auth._id }).populate('id_ticket').select('').limit(1);
        if (ticket.length > 0) {
            return res.status(200).json(ticket)
        } else {
            return res.status(404).json('There is no ticket')
        }
    } catch (error) {
        throw Error(error)
    }
}

exports.cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id });
        if (!ticket) return res.status(404).json('Ticket not found');
        const assign = new Assign({
            id_ticket: req.params.id,
            id_technician: res.auth._id
        })
        const updateEtat = await Ticket.findByIdAndUpdate({ _id: req.params.id }, { etat: 're-waiting' });
        const assigned = await assign.save()
        if (assigned && updateEtat) return res.status(201).json([{ assign }, { updateEtat }])
    } catch (error) {
        throw Error(error)
    }
}


exports.resolvedTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ _id: req.params.id });
        if (!ticket) return res.status(404).json('Ticket not found');
        const assign = new Assign({
            id_ticket: req.params.id,
            id_technician: res.auth._id
        })
        const updateEtat = await Ticket.findByIdAndUpdate({ _id: req.params.id }, { etat: 'resolved' });
        const assigned = await assign.save()
        if (assigned && updateEtat) return res.status(201).json([{ assign }, { updateEtat }])
    } catch (error) {
        throw Error(error)
    }
}




