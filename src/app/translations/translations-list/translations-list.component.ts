import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';

@Component({
  selector: 'translations-list',
  templateUrl: './translations-list.component.html',
  styleUrls: ['./translations-list.component.scss']
})

export class TranslationsListComponent implements OnInit {

  translations: FirebaseListObservable<Translation[]>;
  showSpinner: boolean = true;

  constructor(private translationSvc: TranslationService) { }

  ngOnInit() {
    this.translations = this.translationSvc.getTranslationsList({
       limitToLast: 15
     })
    this.translations.subscribe(() => this.showSpinner = false)
  }
}
