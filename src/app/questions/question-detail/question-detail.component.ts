import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "../shared/question.service";
import { Question } from "../shared/question";
import * as firebase from "firebase";

@Component({
  selector: "question-detail",
  templateUrl: "./question-detail.component.html",
  styleUrls: ["./question-detail.component.scss"]
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;

  editQuestion: boolean = false;
  showQuestionDropdown: boolean = false;

  constructor(private questionSvc: QuestionService) {}

  ngOnInit() {}

  toggleQuestionEdit() {
    this.editQuestion = !this.editQuestion;
  }

  toggleDropdown() {
    this.showQuestionDropdown = !this.showQuestionDropdown;
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
