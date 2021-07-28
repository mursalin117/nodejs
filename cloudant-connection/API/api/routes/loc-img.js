const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const url = process.env.cloudant_url + '/mydb';
const cqs = require('cloudant-quickstart');
const db = cqs(url);

const checkAuth = require('../middleware/check-auth');

const Info = require('../models/schema');

router.get('/', async (req, res, next) => {
    try {
		// var result = [];
        await db.all().then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    message: 'Nothig found'
                });
            }
            return res.status(200).json({
				message: 'Got everything',
				count: result.length,
				information: result.map(info => {
                    return {
                        _id: info._id,
                        location: info.location,
                        request: {
                            type: 'GET',
                            url: "http://localhost:4000/location/" + info._id
                        }
                    }
                })
			});
        });
    } catch (error) {
        return res.status(error['statusCode']).json({
            type: error['error']
        });
    }
});

router.post('/', checkAuth, async (req, res, next) => {
    try{
        if (req.body.location.lat === '' || req.body.location.long === '') {
            return res.status(400).json({
                message: 'lat or long can not be null'
            });
        } else if (req.body.location.weight === '') {
            return res.status(400).json({
                message: 'weight can not be null'
            });
        }
        const info = new Info({
            location: {
                lat: req.body.location.lat,
                long: req.body.location.long,
                weight: req.body.location.weight
            }
        });
        await db.insert(info).then( () => {
            return res.status(201).json({
                message: 'Object created',
                information: info,
                request: {
                    type: 'GET',
                    url: "http://localhost:4000/location/" + info._id
                }
            });
        });
    }catch(error){
        return res.status(error['statusCode']).json({
			type: error['error']
		});
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const ID = req.params.id;
        await db.get(ID).then(info  => {
            return res.status(200).json({
                message: 'Found it',
                information: info,
                request: {
                    type: 'GET',
                    message: 'GET All Information',
                    url: "http://localhost:4000/location/"
                }
            });
        });
    } catch (error) {
        return res.status(error['statusCode']).json({
			type: error['error']
		});
    }
});

router.patch('/:id', checkAuth, async (req, res, next) => {
    try {
		const ID = req.params.id;
		await db.get(ID).then( info => {
			// const requestKeys = Object.keys(req.body);
	        // const requestValues = Object.values(req.body);
	        // const updateQuery = {};
			// // constructing dynamic query
			// for (let i = 0; i < requestKeys.length; i++) {
			// 	if (requestValues[i] === '') return res.status(400).json({
			// 		message: requestKeys[i] + ' can not be null'
			// 	});
			// 	updateQuery[requestKeys[i]] = requestValues[i];
			// }
            console.log(info._id);
            var info = {
                _id: info._id,
                location: {
                    lat: req.body.location.lat || info.location.lat,
                    long: req.body.location.long || info.location.long,
                    weight: req.body.location.weight || info.location.weight
                }
            }
			db.update(info).then( () => {
                return res.status(200).json({
					message: 'Updated successfully',
					request: {
	                    type: 'GET',
	                    url: "http://localhost:4000/location/" + info._id
	                }
				});
			});
		});
    } catch (error) {
        return res.status(error['statusCode']).json({
			type: error['error']
		});
    }
});

router.delete('/:id', checkAuth, async(req, res, next) => {
    try {
        await db.get(req.params.id).then( () => {
			db.delete(req.params.id).then( () => {
				return res.status(200).json({
					message: 'Deleted successfully'
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
