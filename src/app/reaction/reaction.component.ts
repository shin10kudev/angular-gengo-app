import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ReactionService } from './shared/reaction.service';
import * as _ from "lodash";

@Component({
  selector: 'reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit, OnDestroy {

  @Input() postId: string;

  showEmojis: boolean = false;
  emojiList: string[];

  reactionCount: any;
  userReaction: any;

  subscription: any;

  constructor(private reactionSvc: ReactionService) { }

  ngOnInit() {
    this.emojiList = this.reactionSvc.emojiList

    this.subscription = this.reactionSvc.getReactions(this.postId)
                         .subscribe(reactions => {

                           this.reactionCount = this.reactionSvc.countReactions(reactions)
                           this.userReaction  = this.reactionSvc.userReaction(reactions)
    })
  }

  react(val) {
    if (this.userReaction === val) {
      this.reactionSvc.removeReaction(this.postId)
    } else {
      this.reactionSvc.updateReaction(this.postId, val)
    }
  }

  toggleShow() {
    this.showEmojis = !this.showEmojis
  }

  emojiPath(emoji) {
   return `assets/images/reactions/${emoji}.svg`
  }

  hasReactions(index) {
    return _.get(this.reactionCount, index.toString())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
