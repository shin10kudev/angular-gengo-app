import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';
import * as _ from 'lodash';

@Component({
  selector: 'translations-list',
  templateUrl: './translations-list.component.html',
  styleUrls: ['./translations-list.component.scss']
})

export class TranslationsListComponent implements OnInit {

  // Unwrapped arrays from firebase
  translations: any;
  filteredTranslations: any;

  // Active filter rules
  filters = {};

  // Misc.
  showSpinner: boolean = true;

  constructor(private translationSvc: TranslationService) { }

  ngOnInit() {
    this.translationSvc.getTranslationsList({ limitToLast: 20 })
       .subscribe(translations => {
        this.translations = translations;
        this.applyFilters();
        this.showSpinner = false;
       });
  }

  private applyFilters() {
    this.filteredTranslations = _.filter(this.translations, _.conforms(this.filters));
  }
}
