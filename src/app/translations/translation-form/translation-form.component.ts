import { Component, OnInit } from "@angular/core";
import { TranslationService } from "../shared/translation.service";
import { Translation } from "../shared/translation";

@Component({
  selector: "translation-form",
  templateUrl: "./translation-form.component.html",
  styleUrls: ["./translation-form.component.scss"]
})
export class TranslationFormComponent {
  translation: Translation = new Translation();
  inputType: boolean = false;

  constructor(private translationSvc: TranslationService) {}

  createTranslation() {
    let text = this.translation.en.trim();

    if (this.isJapanese(text)) {
      this.translation.ja = text;
      delete this.translation["en"];
    } else {
      this.translation.en = text;
    }

    this.translationSvc.createTranslation(this.translation);
    this.translation = new Translation(); // reset translation
  }

  toggleInputType() {
    this.inputType = !this.inputType;
  }

  detectJapanese(text): boolean {
    return this.isJapanese(text);
  }

  cancelTranslation() {
    this.translation = new Translation(); // reset form
  }

  private isJapanese(text): boolean {
    // Regex idea taken from:
    // https://gist.github.com/ryanmcgrath/982242
    let jpCharRegex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
    return jpCharRegex.test(text);
  }
}
