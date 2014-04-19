
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/weather', ['data']);

console.log('Start Application');

var mdbParam = function (state) {
    return {
        'query': {
            'State': state
        },
        'sort': {
            'Temperature': -1
        },
        'update': {
            '$set': {'month_high': true}
        },
        'new': true
    };
};

var states = [
    'California',
    'Vermont',
    'New Mexico',
    'Florida'];

states.forEach(function (state) {

    db.data.findAndModify(mdbParam(state), function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    });
});
