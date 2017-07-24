import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { MistakeService } from '../shared/mistake.service';
import { Mistake } from '../shared/mistake';

@Component({
  selector: 'mistakes-list',
  templateUrl: './mistakes-list.component.html',
  styleUrls: ['./mistakes-list.component.scss']
})

export class MistakesListComponent implements OnInit {

  mistakes: FirebaseListObservable<Mistake[]>;
  showSpinner: boolean = true;

  constructor(private mistakeSvc: MistakeService) { }

  ngOnInit() {
    this.mistakes = this.mistakeSvc.getMistakesList({
      limitToLast: 15
    });
    this.mistakes.subscribe(() => this.showSpinner = false);
  }
}
