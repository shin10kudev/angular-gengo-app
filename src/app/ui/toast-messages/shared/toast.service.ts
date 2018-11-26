import { Injectable } from "@angular/core";
import { Message } from "./message";

@Injectable()
export class ToastService {
  messages: any = [];
  toastLife: number = 6000;

  constructor() {}

  getMessages(): any {
    return this.messages;
  }

  sendMessage(content, style) {
    this.messages.pop();
    const message = new Message(content, style);
    this.messages.push(message);

    setTimeout(() => {
      this.dismissMessage(message);
    }, this.toastLife);
  }

  dismissMessage(message) {
    message.dismissed = true;
  }
}
