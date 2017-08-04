import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../shared/translation.service';
import { Translation } from '../shared/translation';

@Component({
  selector: 'translation-form',
  templateUrl: './translation-form.component.html',
  styleUrls: ['./translation-form.component.scss']
})

export class TranslationFormComponent {

  translation: Translation = new Translation();
  currentTranslation;
  inputType: boolean = false;

  constructor(private translationSvc: TranslationService) {}

  createTranslation() {
    this.currentTranslation = this.translationSvc.createTranslation(this.translation);
    this.translation = new Translation(); // reset translation
  }

  toggleInputType() {
    this.inputType = !this.inputType;
  }

  cancelTranslation() {
    this.translation = new Translation(); // reset form
  }
}
