const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const { findByIdAndUpdate } = require('../models/schema');

mongoose.set('useFindAndModify', false);

const Info = require('../models/schema');

router.get('/', async (req, res, next) => {
    try {
        await Info.find().select('_id img location note').then(info => {
            if (info.length === 0) {
                return res.status(404).json({
                    message: 'Nothig found'
                });
            }
            const response = {
                message: 'Got everything',
                count: info.length,
                information: info.map(info => {
                    return {
                        _id: info._id,
                        img: info.img,
                        location: info.location,
                        note: info.note,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/location/" + info._id
                        }
                    }
                })
            };

            return res.status(200).json(response);
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.post('/', checkAuth, async (req, res, next) => {
    try{
        if (req.body.img === '') {
            return res.status(400).json({
                message: 'Image can not be null'
            });
        } else if (req.body.location.lat === '' || req.body.location.long === '') {
            return res.status(400).json({
                message: 'location is not given properly'
            });
        } else if (req.body.user_id === '') {
            return res.status(400).json({
                message: 'user_id can not be null'
            });
        }    
        const info = new Info({
            img: req.body.img,
            note: req.body.note,
            location: {
                lat: req.body.location.lat,
                long: req.body.location.long
            },
            user_id: req.body.user_id,
            isAdmin: req.body.isAdmin || 'false',
            approval: req.body.approval || 'false',
            isAuthorized: req.body.isAuthorized || 'false',
            status: req.body.status || 'false'
        });

        await info.save().then( () => {
            return res.status(201).json({
                message: 'Object created',
                information: {
                    _id: info._id,
                    img: info.img,
                    location: info.location,
                    note: info.note,
                    user_id: info.user_id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/location/" + info._id
                    }
                }
            });
        });
    }catch(error){
        return res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const ID = req.params.id;
        await Info.findById(ID).then(info => {
            if (!info) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }
            return res.status(200).json({
                message: 'Found it',
                information: info,
                request: {
                    type: 'GET',
                    message: 'GET All Information',
                    url: "http://localhost:3000/location/"
                }
            });
        });   
    } catch (error) {
        if (error === 'ObjectId') return res.status(404).json({
            message: 'Not Found'
        });
        return res.status(500).send(error.message);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const ID = req.params.id;
        const requestKeys = Object.keys(req.body)
        const requestValues = Object.values(req.body)
        const updateQuery = {};

        // constructing dynamic query        
        for (let i = 0; i < requestKeys.length; i++) {
            if (requestValues[i] === '') return res.status(400).json({
                message: requestKeys[i] + ' can not be null'
            });
            updateQuery[requestKeys[i]] = requestValues[i];
        }
        await Info.findByIdAndUpdate(ID, { $set: updateQuery} ).then(info => {
            if (!info) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }

            return res.status(200).json({
                message: 'Updated successfully',
                information: info,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/location/" + info._id
                }
            });
        });
    } catch (error) {
        if (error === 'ObjectId') return res.status(404).json({
            message: 'Not Found'
        });
        return res.status(500).send(error.message)
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        await Info.findByIdAndDelete(req.params.id).then(info => {
            if (!info) {
                return res.status(404).json({
                    message: 'Not Found'
                });
            }
            return res.status(200).json({
                message: 'Deleted Id',
                information: info,
                request: {
                    type: 'POST',
                    message: 'Create New Information',
                    url: "http://localhost:3000/location/",
                    body: {
                        img: 'String',
                        location: {
                            lat: 'Number',
                            lang: 'Number'
                        },
                        note: 'String',
                        user_id: 'String'
                    }
                }
            });
        });    
    } catch (error) {
        if(error.kind === 'ObjectId') return res.status(404).json({
            message: 'Not Found'
        });
        return res.status(500).send(error.message);
    }
    
});

module.exports = router;