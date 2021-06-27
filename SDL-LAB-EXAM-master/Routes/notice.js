const express = require('express');
const NoticeSchema = require('../Models/Notice');

// create router
const router = express.Router();

// implement get method for retrieve all the notice
router.get('/', async(req, res) => {
    try {
        // NoticeSchema.find retrieve all the notice
        const notice = await NoticeSchema.find();
        res.status(200).json(notice);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// implement get method for retrieve single notice using _id
router.get('/:noticeId', async (req, res) => {
    try {
        // NoticeSchema.find retrieve all the notice
        const notice = await NoticeSchema.findById({_id: req.params.noticeId});
        res.status(200).json(notice);
    } catch (error) {
        res.status(204).json({
            message: error
        });
    }
});


// implement post method for post or create a new notice
router.post('/', async(req, res) => {
    // create object based upon notice schema for save data mongodb local database
    const noticeData = new NoticeSchema({
        subject: req.body.subject,
        description: req.body.description
    });

    // save notice data in mongodb local
    try {
        const saveNotice = await noticeData.save();
        res.status(201).json(saveNotice);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// implement delete method for delete a notice
router.delete('/:noticeId', async(req, res) => {
    try {
        const deleteNotice = await NoticeSchema.findByIdAndDelete(req.params.noticeId);
        res.status(200).json(deleteNotice);
    } catch (error) {
        res.status(404).json({message: error});
    }
});

// implement patch method for updating notice
router.patch('/:noticeId', async(req, res) => {
    try {
        const updateNotice = await NoticeSchema.findByIdAndUpdate(req.params.noticeId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updateNotice);
    } catch (error) {
        res.status(404).json({message: error});
    }
});


// exports module
module.exports = router;