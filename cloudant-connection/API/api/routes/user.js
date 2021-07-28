const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

const url = process.env.cloudant_url + '/mydb2';
const cqs = require('cloudant-quickstart');
const db = cqs(url);

const checkAuth = require('../middleware/check-auth');

const User = require('../models/userSchema');

router.post('/signup', async (req, res, next) => {
    try {
        if (req.body.name === '' || req.body.email === '' || req.body.password === '') {
            return res.status(400).json({
                message: 'name or email or password cannot be empty'
            });
        }
        if (!validator.validate(req.body.email)) {
            return res.status(400).json({
                message: 'invalid email'
            })
        }
        if (req.body.password.length < 7) {
            return res.status(400).json({
                message: 'password should be at least 7 characters'
            });
        }
        await db.query({email: req.body.email}).then( usr => {
            if (usr.length > 0) {
                return res.status().json({
                    message: 'Email already exits'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    } else {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        db.insert(user).then( () => {
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
        return res.status(error['statusCode']).json({
            type: error['error']
        });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        if (!validator.validate(req.body.email)) {
            return res.status(400).json({
                message: 'Invalid email'
            })
        }
        await db.query({email: req.body.email}).then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authentication failed'
                    });
                }
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
        return res.status(error['statusCode']).json({
            type: error['error']
        });
    }
});

router.post('/logout', checkAuth, async (req, res, next) => {

    return res.status(200).json({
        message: 'Successfully logout'
    });
});

router.delete('/delete', checkAuth, async (req, res, next) => {
    try {
        // console.log(req.user.email);
        await db.query({email: req.user.email}).then( usr => {
            db.delete(usr[0]._id).then( () => {
                return res.status(200).json({
                    message: 'User deleted successfully'
                });
            });
        });
    } catch (error) {
        return res.status(error['statusCode']).json({
            type: error['error']
        });
    }
});

module.exports = router;
