module.exports = (app) => {
    const users = require('../controllers/note.controller.js');

    // Create a new User
    app.post('/campus/user', users.create);

    // Retrieve all Notes
    app.get('/campus/user', users.findAll);

    // Retrieve a single User with id
    app.get('/campus/user/:id', users.findOne);

    // Update a User with id
    app.put('/campus/user/:id', users.update); 

    // Delete a User with id
    app.delete('/campus/user/:id', users.delete);
}
