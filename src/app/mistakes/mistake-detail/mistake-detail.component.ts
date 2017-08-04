import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { MistakeService } from '../shared/mistake.service';
import { Mistake } from '../shared/mistake';

@Component({
  selector: 'mistake-detail',
  templateUrl: './mistake-detail.component.html',
  styleUrls: ['./mistake-detail.component.scss']
})

export class MistakeDetailComponent implements OnInit {

  @Input() mistake: Mistake;
  defaultMessage: string = "Retrieving data";
  edit: boolean = false;

  constructor(private mistakeSvc: MistakeService) { }

  ngOnInit() {
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  // Update mistake
  updateMistake() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistakeSvc.updateMistake(this.mistake.$key, this.mistake);
  }

  // Update mistake status
  updateStatus(value: boolean) {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistake.verified = value;
    this.mistakeSvc.updateMistake(this.mistake.$key, this.mistake);
  }

  // Increase mistake errorCount
  increaseErrorCount() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistake.errorCount++;
    this.mistakeSvc.updateMistake(this.mistake.$key, this.mistake);
  }

  // Decrease mistake errorCount
  decreaseErrorCount() {
    if(this.mistake.errorCount === 0) return;
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistake.errorCount--;
    this.mistakeSvc.updateMistake(this.mistake.$key, this.mistake);
  }

  // Delete mistake
  deleteMistake() {
    if(this.confirmAction('Are you sure you want to delete this entry?'))
      this.mistakeSvc.deleteMistake(this.mistake.$key);
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
