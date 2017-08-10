import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../shared/feedback.service';
import { Feedback } from '../shared/feedback';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  feedbacks: FirebaseListObservable<Feedback[]>;
  showSpinner: boolean = true;

  constructor(private feedbackSvc: FeedbackService) { }

  ngOnInit() {
    this.feedbacks = this.feedbackSvc.getFeedbacksList({ limitToLast: 20 })
    this.feedbacks.subscribe(() => this.showSpinner = false)
  }
}
