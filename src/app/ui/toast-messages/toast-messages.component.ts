import { Component, OnInit } from '@angular/core';
import { ToastService } from './shared/toast.service';

@Component({
  selector: 'toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss'],
})
export class ToastMessagesComponent implements OnInit {

  messages: any;

  constructor(private toast: ToastService) { }

  ngOnInit() {
    this.messages = this.toast.getMessages();
  }

  dismiss(message) {
    this.toast.dismissMessage(message);
  }
}
