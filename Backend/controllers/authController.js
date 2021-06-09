const Employer = require('../models/Employer');
const { loginValidation, registerValidation } = require('../validation/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Department = require('../models/Department');


exports.signup = async (req, res) => {
    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message, ...req.body });

    const { email, password,  department } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const findDepartment = await Department.findOne({nom: department})
    const ifEmailExist = await Employer.findOne({ email });
    if (ifEmailExist) return res.status(400).json('email already exist!');
    const employer = new Employer({
        ...req.body,
        id_department: findDepartment._id
        
    })
    employer.password = hashPassword;
    try {
        const saved = await employer.save();
        if (saved) return res.status(201).json(`${employer.type} created successfully`);
    } catch (error) {
        return res.status(500).json('Error server!')
    }
}

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    try {
        const checkUser = await Employer.findOne({ email });
        if (!checkUser) return res.status(400).json({ err: 'Invalid email or password' });
        const match = await bcrypt.compare(password, checkUser.password);
        if (!match) return res.status(400).json({ err: 'Invalid email or password' });
        const token = jwt.sign({ id: checkUser._id, type: checkUser.type }, process.env.JWT_SECRET, { expiresIn: 600000000, });
        return res.status(200).cookie('auth_token', token, { maxAge: 600000000, httpOnly: true }).json({ type: checkUser.type, isAuth: true });
    } catch (err) {
        res.status(400).json({ error: 'bad request' });
    }
}

exports.logout = (req, res) => {
    res.status(200).clearCookie('auth_token')
        .json({ type: null, isAuthenticated: false, logout: true })
}

