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
  isEdit: boolean = false;

  constructor(private mistakeSvc: MistakeService) { }

  ngOnInit() {
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

  // Increase mistake count
  increaseCount() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistake.count++;
    this.mistakeSvc.updateMistake(this.mistake.$key, this.mistake);
  }

  // Decrease mistake count
  decreaseCount() {
    if(this.mistake.count === 0) return;
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.mistake.updated_at = date;
    this.mistake.count--;
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
