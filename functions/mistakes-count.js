// Track count of mistakes
// *****************************************************************************************
// *****************************************************************************************
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Source:
 * https://github.com/firebase/functions-samples/blob/master/child-count/functions/index.js
 *
 */
// *****************************************************************************************
// *****************************************************************************************

// Keeps track of the length of the 'likes' child list in a separate property.
exports.countmistakechange = functions.database.ref('/mistakes/{userId}/{mistakeId}').onWrite(event => {
  const collectionRef = event.data.ref.parent;
  const userId = event.params.userId;
  const countRef = collectionRef.parent.child(`${userId}/mistakes_count`);

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return countRef.transaction(current => {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  }).then(() => {
    console.log('Counter updated.');
  });
});

// If the number of likes gets deleted, recount the number of likes
exports.recountmistakes = functions.database.ref('/mistakes/{userId}/mistakes_count').onWrite(event => {
  if (!event.data.exists()) {
    const counterRef = event.data.ref;
    const collectionRef = counterRef.parent.child(`{mistakeId}`);

    // Return the promise from counterRef.set() so our function
    // waits for this async event to complete before it exits.
    return collectionRef.once('value')
        .then(messagesData => counterRef.set(messagesData.numChildren()));
  }
});
