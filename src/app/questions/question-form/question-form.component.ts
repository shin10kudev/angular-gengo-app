import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../shared/question.service";
import { Question } from "../shared/question";

@Component({
  selector: "question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.scss"]
})
export class QuestionFormComponent implements OnInit {
  question: Question = new Question();
  newQuestionModalOpen: boolean = false;

  constructor(private questionSvc: QuestionService) {}

  ngOnInit() {}

  toggleNewQuestionModal() {
    this.newQuestionModalOpen = !this.newQuestionModalOpen;
  }

  createQuestion() {
    this.questionSvc.createQuestion(this.question);
    this.question = new Question(); // reset form
    this.toggleNewQuestionModal();
  }

  cancelQuestion() {
    this.question = new Question(); // reset form
  }
}
