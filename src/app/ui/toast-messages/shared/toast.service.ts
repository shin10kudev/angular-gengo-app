import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable()
export class ToastService {

  messages: any = [];

  constructor() {}

  getMessages(): any[] {
    return this.messages;
  }

  sendMessage(content, style) {
    this.messages.pop();
    const message = new Message(content, style);
    this.messages.push(message);
  }

  dismissMessage(message) {
    message.dismissed = true;
  }
}
