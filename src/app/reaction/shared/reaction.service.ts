import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as _ from "lodash";

@Injectable()
export class ReactionService {

  userId: string;
  emojiList = ['like', 'love', 'wow', 'haha', 'sad', 'angry']

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }

  getReactions(itemId): FirebaseObjectObservable<any> {
    return this.db.object(`reactions/${itemId}`)
  }

  updateReaction(itemId, reaction=0) {
    const data = { [this.userId]: reaction }
    this.db.object(`reactions/${itemId}`).update(data)
  }

  removeReaction(itemId) {
    this.db.object(`reactions/${itemId}/${this.userId}`).remove()
  }

  // Utilities
  countReactions(reactions) {
    return _.mapValues(_.groupBy(reactions), 'length')
  }

  userReaction(reactions) {
    return _.get(reactions, this.userId)
  }
}
