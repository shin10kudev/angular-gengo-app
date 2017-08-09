import { Component } from '@angular/core';
import { AuthService } from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  close: boolean = false;

  constructor() {}
  title = 'FireStarter app works!';

  triggerClose() {
    this.close = !this.close;
  }
}
