'use strict';
var functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const request = require('request-promise');
const _ = require('lodash');

// Translate function (Google Translate API)
// *****************************************************************************************
// *****************************************************************************************
// *****************************************************************************************
// *****************************************************************************************

// List of output languages.
const LANGUAGES = ['ja'];

exports.translate = functions.database.ref('/translations/{userId}/{translationId}').onCreate(event => {
  const snapshot = event.data;
  const userId = event.params.userId;
  const promises = [];

  _.each(LANGUAGES, (lang) => {
      console.log(lang)
      promises.push(createTranslationPromise(lang, snapshot, userId));
   })

  return Promise.all(promises);
});

// URL to the Google Translate API.
function createTranslateUrl(lang, text) {
  return `https://www.googleapis.com/language/translate/v2?key=${functions.config().firebase.apiKey}&source=en&target=${lang}&q=${text}`;
}

function createTranslationPromise(lang, snapshot, userId) {
  const key = snapshot.key;
  const text = snapshot.val().english;
  let translation = {}

  return request(createTranslateUrl(lang, text), {resolveWithFullResponse: true}).then(
      response => {
        if (response.statusCode === 200) {
          const resData = JSON.parse(response.body).data;

          translation[lang] = resData.translations[0].translatedText

          return admin.database().ref(`/translations/${userId}/${key}`)
              .update(translation);
        }
        else throw response.body;
      });
}
