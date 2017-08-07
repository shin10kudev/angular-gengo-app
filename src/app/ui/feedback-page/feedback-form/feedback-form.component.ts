import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../shared/feedback.service';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  feedback: Feedback = new Feedback();
  categories: any = ['Bug', 'Feature Request', 'General Feedback', 'Love', 'Other'];

  constructor(private feedbackSvc: FeedbackService) { }

  ngOnInit() {
  }

  createFeedback() {
    this.feedbackSvc.createFeedback(this.feedback);
    this.feedback = new Feedback(); // reset form
  }

  cancelFeedback() {
    this.feedback = new Feedback(); // reset form
  }
}
