import { Component, OnInit, Input } from '@angular/core';
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


  constructor(private mistakeSvc: MistakeService) { }

  ngOnInit() {
  }

  // Update mistake
  updateMistake() {
    let date = new Date().getTime();
    this.mistakeSvc.updateMistake(
      this.mistake.$key,
      {
        content: this.mistake.content,
        correction: this.mistake.correction,
        updated_at: date
      })
  }

  // Update mistake status
  updateStatus(value: boolean) {
    let date = new Date().getTime();
    this.mistakeSvc.updateMistake(
      this.mistake.$key,
      {
        verified: value,
        updated_at: date
      })
  }

  // Update mistake count
  updateCount(value: boolean) {
    let date = new Date().getTime();
    let countDirection = value ? (this.mistake.count + 1) : (this.mistake.count - 1);

    if(countDirection < 0) countDirection = 0;

    this.mistakeSvc.updateMistake(
      this.mistake.$key,
      {
        count: countDirection,
        updated_at: date
      })
  }

  // Delete mistake
  deleteMistake() {
    this.mistakeSvc.deleteMistake(this.mistake.$key);
  }
}
