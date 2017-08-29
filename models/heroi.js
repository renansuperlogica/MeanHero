var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var heroischema = new Schema({
    nome: String
});

module.exports = mongoose.model('heroichema', heroischema);