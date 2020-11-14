import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  title: string = '';
  messages: string[] = [];

  constructor() {}

  add(title: string, message: string) {
    this.title = title;
    this.messages.push(message);
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.messages = [];
    this.title = '';
  }
}
