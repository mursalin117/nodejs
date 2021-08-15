const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();

const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        return res.send({
            message: 'Data saved successfully'
        });
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const data = await firestore.collection('students').get();
        if (data.empty) {
            return res.status(404).send({
                message: 'No data found'
            });
        } else {
            const students = [];
            data.forEach(doc => {
                const student = new Student (
                    doc.id,
                    doc.data().name,
                    doc.data().roll,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester
                );
                students.push(student);
            });
            return res.send({
                count: students.length,
                students
            });
        }
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await firestore.collection('students').doc(id).get();
        if (!data.exists) {
            return res.status(404).send({
                message: 'Not found'
            });
        } else {
            return res.send(data.data());
        }
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const  student = await firestore.collection('students').doc(id).get();
        if (!student.exists) {
            return res.status(404).send({
                message: 'Not Found'
            });
        } else {
            await firestore.collection('students').doc(id).update(data);
            return res.send({
                message: 'Data updated successfully'
            });
        }
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id).get();
        if (!student.exists) {
            return res.status(404).send({
                message: 'Not Found'
            });
        } else {
            await firestore.collection('students').doc(id).delete();
            return res.send({
                message: 'Data deleted successfully'
            });
        }
    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
}

module.exports ={
    addStudent,
    getAllStudents,
    getSearchStudent,
    getStudent,
    updateStudent,
    deleteStudent
}