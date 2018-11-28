import { Component, OnInit, Input } from "@angular/core";
import * as firebase from "firebase";
import { TranslationService } from "../shared/translation.service";
import { Translation } from "../shared/translation";
import { categories } from "../shared/categories";

@Component({
  selector: "translation-detail",
  templateUrl: "./translation-detail.component.html",
  styleUrls: ["./translation-detail.component.scss"]
})
export class TranslationDetailComponent implements OnInit {
  @Input() translation: Translation;
  editTranslation: boolean = false;
  actionDropdownOpen: boolean = false;
  categories: any;

  constructor(private translationSvc: TranslationService) {
    this.categories = categories; // imported from ../shared/categories.ts
  }

  ngOnInit() {}

  toggleEdit() {
    this.editTranslation = !this.editTranslation;
  }

  toggleDropdown() {
    this.actionDropdownOpen = !this.actionDropdownOpen;
  }

  textToSpeech() {
    const synth = window.speechSynthesis;

    // Clear previous utterance
    synth.cancel();

    // Create new utterance
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = this.translation.ja;
    utterance.rate = 0.7; // 0.1 to 10
    utterance.volume = 0.9; // 0 to 1
    utterance.lang = "ja-JP";

    synth.speak(utterance);
  }

  // Update translation
  updateTranslation() {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.translation.updated_at = date;
    this.translationSvc.updateTranslation(
      this.translation.$key,
      this.translation
    );
  }

  // Update translation status
  updateTranslationLike(value: boolean) {
    let date = firebase.database.ServerValue.TIMESTAMP;
    this.translation.updated_at = date;
    this.translation.liked = value;
    this.translationSvc.updateTranslation(
      this.translation.$key,
      this.translation
    );
  }

  // Delete translation
  deleteTranslation() {
    if (this.confirmAction("Are you sure you want to delete this phrase?"))
      this.translationSvc.deleteTranslation(this.translation.$key);
  }

  // Default confirm action
  private confirmAction(msg: string) {
    return confirm(msg);
  }
}
