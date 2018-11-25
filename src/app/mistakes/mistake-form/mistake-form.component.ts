import { Component, OnInit } from "@angular/core";
import { MistakeService } from "../shared/mistake.service";
import { Mistake } from "../shared/mistake";

@Component({
  selector: "mistake-form",
  templateUrl: "./mistake-form.component.html",
  styleUrls: ["./mistake-form.component.scss"]
})
export class MistakeFormComponent implements OnInit {
  mistake: Mistake = new Mistake();
  newMistakeModalOpen: boolean = false;

  constructor(private mistakeSvc: MistakeService) {}

  ngOnInit() {}

  toggleNewMistakeModal() {
    this.newMistakeModalOpen = !this.newMistakeModalOpen;
  }

  createMistake() {
    this.mistakeSvc.createMistake(this.mistake);
    this.mistake = new Mistake(); // reset form
    this.toggleNewMistakeModal();
  }

  cancelMistake() {
    this.mistake.title = ""; // reset form
  }
}
