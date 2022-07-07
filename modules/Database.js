module.exports = {
  // Insert
  Insert: function (coll, data, callback) {
    // console.log("- INSERT -")
    coll.insert(data, (err, doc) => callback(err, doc))
  },

  // Select one record
  SelectOne: function (coll, data, callback) {
    // console.log("- SELECT -")
    coll.findOne(data, (err, doc) => callback(err, doc))
  },

  Select: function (coll, data, callback) {
    coll.find(data, (err, docs) => callback(err, docs))
  },

  SelectAndLimit: function (coll, data, sortObj, numberOfRows, callback) {
    // made especially for receiving messages
    coll.find(data).sort(sortObj).limit(numberOfRows).exec((err, docs) => callback(err, docs));
  },

  Update: function(coll, conditions, data, callback) {
    coll.udpate( {conditions}, { $set: data }, { multi: true }, (err, docs) => callback(err, docs) )
  },
}

/*
a) wstawienie wielu dokumentów do kolekcji

console.log("PRZED FOR: " + new Date().getMilliseconds())
for (var i = 0; i < 3; i++) {
  var doc = {
    a: "a"+i,
    b: "b"+i
  };
  coll1.insert(doc, function (err, newDoc) {
    console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds())
  });
}
console.log("PO FOR: " + new Date().getMilliseconds())

Uwaga: zobacz kolejność wyświetlania milisekund


b) pobranie jednego dokumentu z kolekcji

podmień _id na swoje z kolekcji

coll1.findOne({ _id: ' HUIr4XfP2hQX9vfa ' }, function (err, doc) {
  console.log("----- obiekt pobrany z bazy: ",doc)
  console.log("----- formatowanie obiektu js na format JSON: ")
  console.log(JSON.stringify(doc, null, 5))
});

c) pobranie wszystkich dokumentów z kolekcji

coll1.find({ }, function (err, docs) {
  //zwracam dane w postaci JSON
  console.log("----- tablica obiektów pobrana z bazy: \n")
  console.log(docs)
  console.log("----- sformatowany z wcięciami obiekt JSON: \n")
  console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

d) pobranie wielu dokumentów z warunkiem

coll1.find({ a: "a1" }, function (err, docs) {
  console.log(JSON.stringify({ "docsy": docs }, null, 5))
});

e) pobranie liczby dokumentów

coll1.count({}, function (err, count) {
  console.log("dokumentów jest: ",count)
});

f) pobranie liczby dokumentów z warunkiem

coll1.count({ a: "a1" }, function (err, count) {
  console.log("dokumentów jest: ",count)
});

g) usunięcie pierwszego napotkanego dokumentu spełniającego warunek

coll1.remove({ a:"a2" }, {}, function (err, numRemoved) {
  console.log("usunięto dokumentów: ",numRemoved)
});

g) usunięcie wszystkich dokumentów spełniających warunek

coll1.remove({ a:"a1" }, { multi: true }, function (err, numRemoved) {
  console.log("usunięto dokumentów: ",numRemoved)
});

h) usunięcie wszystkich dokumentów z kolekcji

coll1.remove({}, { multi: true }, function (err, numRemoved) {
  console.log("usunięto wszystkie dokumenty: ",numRemoved)
});

*/