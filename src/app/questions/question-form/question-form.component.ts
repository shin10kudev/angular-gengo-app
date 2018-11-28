import { Component, OnInit, Input } from "@angular/core";
import { QuestionService } from "../shared/question.service";
import { Question } from "../shared/question";
import { speakers } from "../shared/speakers";

@Component({
  selector: "question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.scss"]
})
export class QuestionFormComponent implements OnInit {
  question: Question = new Question();
  newQuestionModalOpen: boolean = false;
  showAdditionalInputs: boolean = false;
  speakers: any;

  @Input() formType: string;

  constructor(private questionSvc: QuestionService) {
    this.speakers = speakers; // imported from ../shared/speakers.ts
  }

  ngOnInit() {}

  toggleNewQuestionModal() {
    this.newQuestionModalOpen = !this.newQuestionModalOpen;
  }

  toggleAdditionalInputs() {
    this.showAdditionalInputs = !this.showAdditionalInputs;
    this.resetAdditionalInputs();
  }

  resetAdditionalInputs() {
    this.question.topic = null;
    this.question.additional_answer = null;
    this.question.notes = null;
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
