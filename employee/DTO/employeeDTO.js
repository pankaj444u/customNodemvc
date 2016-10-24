var mongoose = require('../../Config/config')

var Schema   = mongoose.Schema;

var Employee = new Schema({
    empName : String
});


module.exports = mongoose.model('Employee', Employee);