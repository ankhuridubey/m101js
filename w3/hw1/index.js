
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/school', ['students']);

function lowestScore(doc) {
    var lowMark = null;
    for (var i in doc['scores']) {
        if (doc['scores'][i]['type'] === 'homework' && 
                (lowMark === null || lowMark['score'] > doc['scores'][i]['score'])) {
            lowMark = doc['scores'][i];
        }
    }
    return lowMark;
}

db.students.find().forEach(function(err, doc) {

    if (err) {
        console.log(err);
        return;
    } else if (!doc) {
        return;
    }
    console.log(JSON.stringify(doc));
    console.log('lowMark : ' + JSON.stringify(lowestScore(doc)));

    db.students.update({'_id': doc['_id']}, {'$pull': {'scores': lowestScore(doc)}});
});

