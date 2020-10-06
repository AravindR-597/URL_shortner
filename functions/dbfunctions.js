var db = require("../config/connection");
var collection = require("../config/collections");
module.exports = {
  add: (url, callback) => {
    db.get()
      .collection(collection.URL_COLLECTION)
      .insertOne(url)
      .then((data) => {
        callback(data);
      });
  },
  display: () => {
    return new Promise(async (resolve, reject) => {
      let displayUrl = await db
        .get()
        .collection(collection.URL_COLLECTION)
        .find()
        .toArray();
        resolve(displayUrl);
    });
  },
  findUrl: (url) => {
    return new Promise(async (resolve, reject) => {
      let fetchedUrl = {};
      fetchedUrl = await db
        .get()
        .collection(collection.URL_COLLECTION)
        .find({ shrinkedUrl: url }, { shrinkedUrl: 0, _id: 0 })
        .toArray();
      //console.log(fetchedUrl[0]);
      resolve(fetchedUrl[0]);
    });
  },
};
