import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';

@Component({
  selector: 'translation-detail',
  templateUrl: './translation-detail.component.html',
  styleUrls: ['./translation-detail.component.scss']
})

export class TranslationDetailComponent implements OnInit {

  @Input() translation: Translation;
  defaultMessage: string = "Running translation in the cloud..."

  constructor(private translationSvc: TranslationService) { }

  ngOnInit() {
  }

  // Update translation
  updateTranslation() {
    let date = new Date().getTime();
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
    let date = new Date().getTime();
    this.translationSvc.updateTranslation(
      this.translation.$key,
      {
        verified: value,
        updated_at: date
      })
  }

  // Delete translation
  deleteTranslation() {
    this.translationSvc.deleteTranslation(this.translation.$key)
  }
}
