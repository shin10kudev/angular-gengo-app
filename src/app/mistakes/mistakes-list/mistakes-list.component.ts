import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { MistakeService } from '../shared/mistake.service';
import { Mistake } from '../shared/mistake';
import * as _ from 'lodash';

@Component({
  selector: 'mistakes-list',
  templateUrl: './mistakes-list.component.html',
  styleUrls: ['./mistakes-list.component.scss']
})

export class MistakesListComponent implements OnInit {

  constructor(private mistakeSvc: MistakeService) { }

  // Unwrapped arrays from firebase
  mistakes: any;
  filteredMistakes: any;

  // Filter-able properties
  verified: boolean;
  errorCount: number;
  content: string;

  // Active filter rules
  filters = {};

  // Misc. properties
  showSpinner: boolean = true;
  isFilter: boolean = false;

  ngOnInit() {
    this.mistakeSvc.getMistakesList({ limitToLast: 20 })
      .subscribe(mistakes => {
        this.mistakes = mistakes;
        this.applyFilters();
        this.showSpinner = false;
      });
  }

  private applyFilters() {
    this.filteredMistakes = _.filter(this.mistakes, _.conforms(this.filters) );
  }

  // Filter property by equality to rule
  filterExact(property: string, rule: any) {
    _.debounce(
      this.filters[property] = val => val == rule,
      500
      )
    this.applyFilters();
  }

  // Filter property by partial equality to rule
  filterPartial(property: string, rule: any) {
    _.debounce(
      this.filters[property] = val => val.indexOf(rule) >= 0,
      500
      )
    this.applyFilters();
  }

  // Filter properties that resolve to true
  filterBoolean(property: string, rule: boolean) {
    if(!rule) this.removeFilter(property)
    else {
      this.filters[property] = val => val;
      this.applyFilters();
    }
  }

  // Filter numbers greater than rule
  filterGreaterThan(property: string, rule: number) {
    this.filters[property] = val => val > rule;
    this.applyFilters();
  }

  // Remove filters
  removeFilter(property: string) {
    delete this.filters[property];
    this[property] = null;
    this.applyFilters();
  }
}
