import { Component, OnInit, Input } from "@angular/core";
import { FeedbackService } from "../shared/feedback.service";
import { Feedback } from "../shared/feedback";
import * as firebase from "firebase";

@Component({
  selector: "feedback-detail",
  templateUrl: "./feedback-detail.component.html",
  styleUrls: ["./feedback-detail.component.scss"]
})
export class FeedbackDetailComponent implements OnInit {
  @Input() feedback: Feedback;

  edit: boolean = false;
  showDropdown: boolean = false;

  constructor(private feedbackSvc: FeedbackService) {}

  ngOnInit() {}

  toggleEdit() {
    this.edit = !this.edit;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Update feedback
  updateFeedback() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.feedback.updated_at = date;
    this.feedback.edited = true;
    this.feedbackSvc.updateFeedback(this.feedback.$key, this.feedback);
  }

  // Delete feedback
  deleteFeedback() {
    if (this.confirmAction("Are you sure you want to delete this?"))
      this.feedbackSvc.deleteFeedback(this.feedback.$key);
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
