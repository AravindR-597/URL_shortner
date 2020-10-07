var db = require("../config/connection");
var collection = require("../config/collections");
const { ObjectId } = require("mongodb");
module.exports = {
  addUrl: (url, callback) => {
    db.get()
      .collection(collection.URL_COLLECTION)
      .insertOne(url)
      .then((data) => {
        callback(data);
      });
  },
  displayUrl: () => {
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
      await db
        .get()
        .collection(collection.URL_COLLECTION)
        .findOne({ shrinkedUrl: url })
        .then((fetchedUrl) => {
          resolve(fetchedUrl);
        });
    });
  },
  deleteUrl: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.URL_COLLECTION)
        .deleteOne({ _id: ObjectId(id) })
        .then((data) => {
          resolve(data);
        });
    });
  },
};
