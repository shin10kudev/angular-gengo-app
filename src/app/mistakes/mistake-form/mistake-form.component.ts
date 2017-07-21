import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MistakeService } from '../shared/mistake.service';
import { Mistake } from '../shared/mistake';

@Component({
  selector: 'mistake-form',
  templateUrl: './mistake-form.component.html',
  styleUrls: ['./mistake-form.component.scss']
})

export class MistakeFormComponent implements OnInit {

  mistake: Mistake = new Mistake();

  constructor(private mistakeSvc: MistakeService) { }

  ngOnInit() {
  }

  createMistake() {
    this.mistakeSvc.createMistake(this.mistake);
    this.mistake = new Mistake(); // reset form
  }
}