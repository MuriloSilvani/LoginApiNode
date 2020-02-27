const mongoose = require('mongoose');

module.exports =
    mongoose.connect('mongodb+srv://admin:admin@javascrip-bnd4p.mongodb.net/Login?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
