import { Component, OnInit } from "@angular/core";
import { TranslationService } from "../shared/translation.service";
import * as _ from "lodash";

@Component({
  selector: "translations-list",
  templateUrl: "./translations-list.component.html",
  styleUrls: ["./translations-list.component.scss"]
})
export class TranslationsListComponent implements OnInit {
  // Unwrapped arrays from firebase
  translations: any;
  filteredTranslations: any;

  // Active filter rules
  filters = {};

  // Misc.
  showSpinner: boolean = true;

  constructor(private translationSvc: TranslationService) {}

  ngOnInit() {
    this.translationSvc
      .getTranslationsList({ limitToLast: 100 })
      .subscribe(translations => {
        this.translations = translations;
        this.applyFilters();
        this.showSpinner = false;
      });
  }

  private applyFilters() {
    this.filteredTranslations = _.filter(
      this.translations,
      _.conforms(this.filters)
    );
  }
}
