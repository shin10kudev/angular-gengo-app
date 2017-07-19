import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';

@Component({
  selector: 'translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})

export class TranslationListComponent implements OnInit {

  translations: FirebaseListObservable<Translation[]>;
  showSpinner: boolean = true;

  constructor(private translationSvc: TranslationService) { }

  ngOnInit() {
    this.translations = this.translationSvc.getTranslationsList({
       limitToLast: 15,
       orderByChild: 'created_at'
     })
    this.translations.subscribe(() => this.showSpinner = false)
  }
}
