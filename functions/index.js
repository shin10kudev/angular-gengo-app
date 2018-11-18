"use strict";
var functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const request = require("request-promise");

// Translate function (Google Translate API)
// *****************************************************************************************
// *****************************************************************************************

// List of output languages.
exports.translate = functions.database
  .ref("/translations/{userId}/{translationId}")
  .onCreate(event => {
    const snapshot = event.data;
    const userId = event.params.userId;
    const promises = [];

    if (snapshot.val().en) {
      var source = "en";
      var target = "ja";
      var text = snapshot.val().en;
      promises.push(
        createTranslationPromise(source, target, text, snapshot, userId)
      );
    } else if (snapshot.val().ja) {
      var source = "ja";
      var target = "en";
      var text = encodeURIComponent(snapshot.val().ja);
      promises.push(
        createTranslationPromise(source, target, text, snapshot, userId)
      );
    } else {
      // Todo return error on client side
      console.log("there was an error");
      return;
    }

    return Promise.all(promises);
  });

// URL to the Google Translate API.
function createTranslateUrl(source, target, text) {
  return `https://www.googleapis.com/language/translate/v2?key=${
    functions.config().firebase.apiKey
  }&source=${source}&target=${target}&q=${text}`;
}

// Process Translation
function createTranslationPromise(source, target, text, snapshot, userId) {
  const key = snapshot.key;
  const translation = {};

  return request(createTranslateUrl(source, target, text), {
    resolveWithFullResponse: true
  }).then(response => {
    if (response.statusCode === 200) {
      const resData = JSON.parse(response.body).data;

      translation[target] = resData.translations[0].translatedText;

      return admin
        .database()
        .ref(`/translations/${userId}/${key}`)
        .update(translation);
    } else throw response.body;
  });
}
