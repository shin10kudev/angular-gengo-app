import { Component, OnInit, Input } from '@angular/core';
import { FeedbackService } from '../shared/feedback.service';
import { Feedback } from '../shared/feedback';

@Component({
  selector: 'feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.scss']
})

export class FeedbackDetailComponent implements OnInit {

  @Input() feedback: Feedback;

  constructor(private feedbackSvc: FeedbackService) { }

  ngOnInit() {
  }
}
