const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findByIdAndUpdate } = require('../models/userSchema');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const User = require('../models/userSchema');

router.post('/signup', async (req, res, next) => {
    try {
        await User.find({email: req.body.email}).exec().then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email exits'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save().then( () => {
                            console.log(user);
                            return res.status(200).json({
                                message: 'User created successfully'
                            });
                        });
                    }
                });
            }
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        await User.find({email: req.body.email}).then(user => {
            if (user.length < 1) return res.status(401).json({
                message: 'Authentication failed'
            });
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) return res.status(401).json({
                    message: 'Authentication failed'
                });
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: 'Authentication successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Authenticaion Failed'
                });
            });
        });
    } catch (error) {
        if (error === 'ObjectId') return res.status(401).json({
            message: 'Authentication failed'
        });
    }
});

router.delete('/:userId', async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId).then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json({
                message: 'User deleted successfully'
            });
        });
    } catch (error) {
        if (error === 'ObjectId') return res.status(404).json({
            message: 'User not found'
        });
        return res.status(500).send(error.message);
    }
});

module.exports = router;