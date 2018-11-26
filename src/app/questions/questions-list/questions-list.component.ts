import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../shared/question.service";
import { Question } from "../shared/question";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: "questions-list",
  templateUrl: "./questions-list.component.html",
  styleUrls: ["./questions-list.component.scss"]
})
export class QuestionsListComponent implements OnInit {
  questions: FirebaseListObservable<Question[]>;
  showSpinner: boolean = true;

  constructor(private questionSvc: QuestionService) {}

  ngOnInit() {
    this.questions = this.questionSvc.getQuestionsList({
      limitToLast: 20,
      orderByChild: "timestamp"
    });
    this.questions.subscribe(() => (this.showSpinner = false));
  }
}
