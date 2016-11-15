var mongoose = require('../../Config/config')

var Schema   = mongoose.Schema;

var Conference = new Schema({
    empName : String,
    confName: String,
    createdAt: {type: Date, default: Date.now},
    frmDate: String,
    toDate: String

});


module.exports = mongoose.model('Conferene', Conference);