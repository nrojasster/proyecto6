const Usuario = require('../models/User');
const  bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const createdUser = await Usuario.create({
            username,
            email,
            password: hashedPassword
        })
        return res.json( {message: 'Usuario Creado Correctamente'} );
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let foundedUser = await Usuario.findOne({ username });
        if (!foundedUser) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }
        const correctPassword = await bcryptjs.compare(password, foundedUser.password); 
        if (!correctPassword){
            return res.status(400).json({ message: 'El usuario o la contraseña no es valida' });
        }

        const payload = { user: {  id: foundedUser.id } };

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 65000   //18 horas aprox.
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        )

    } catch (error) {
        res.json({
            message: "There was an error:", error
        })
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const user = await Usuario.findById(req.user.id).select('-password')
        res.json({ user })
    } catch (error) {
        res.status(500).json({ message: 'There was an error verifing the user', error })
    }
}

exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const upUser = 
	        await Usuario.findByIdAndUpdate(id, { username, email, password: hashedPassword }, { new: true })
        res.json(upUser)
    } catch (error) {        
        res.status(500).json({ msg: "There was an error updating the User" })
    }
}