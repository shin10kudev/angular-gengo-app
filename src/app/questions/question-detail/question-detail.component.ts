import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../shared/question.service';
import { Question } from '../shared/question';
import { speakers } from '../shared/speakers';
import * as firebase from 'firebase';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent implements OnInit {
  @Input() question: Question;
  editQuestionModalOpen: boolean = false;
  showAdditionalInputs: boolean = false;
  speakers: any;

  constructor(private questionSvc: QuestionService) {
    this.speakers = speakers; // imported from ../shared/speakers.ts
  }

  ngOnInit() {}

  toggleEditQuestionModal() {
    this.editQuestionModalOpen = !this.editQuestionModalOpen;
  }

  toggleAdditionalInputs() {
    this.showAdditionalInputs = !this.showAdditionalInputs;
  }

  // Update question
  updateQuestion() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.question.updated_at = date;
    this.questionSvc.updateQuestion(this.question.$key, this.question);
  }

  // Update question status
  updateQuestionLike(value: boolean) {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.question.updated_at = date;
    this.question.liked = value;
    this.questionSvc.updateQuestion(this.question.$key, this.question);
  }

  // Delete question
  deleteQuestion() {
    if (this.confirmAction('Are you sure you want to delete this question?'))
      this.questionSvc.deleteQuestion(this.question.$key);
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
