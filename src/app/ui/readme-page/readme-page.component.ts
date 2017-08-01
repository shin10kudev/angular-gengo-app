import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../core/auth.service";

@Component({
  selector: 'readme-page',
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.scss']
})
export class ReadmePageComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
}
