import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';

@Component({
  selector: 'translation-detail',
  templateUrl: './translation-detail.component.html',
  styleUrls: ['./translation-detail.component.scss']
})

export class TranslationDetailComponent implements OnInit {

  @Input() translation: Translation;
  translationMsg: string = "Running translation in the cloud..."
  defaultMsg: string = "Awaiting translation..."

  constructor(private translationSvc: TranslationService) { }

  ngOnInit() {
  }

  // Update translation
  updateTranslation() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.translationSvc.updateTranslation(
      this.translation.$key,
      {
        english: this.translation.english,
        ja: this.translation.ja,
        updated_at: date
      })
  }

  // Update translation status
  updateStatus(value: boolean) {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.translationSvc.updateTranslation(
      this.translation.$key,
      {
        verified: value,
        updated_at: date
      })
  }

  // Delete translation
  deleteTranslation() {
    if(this.confirmAction('Are you sure you want to delete this phrase?'))
      this.translationSvc.deleteTranslation(this.translation.$key)
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
