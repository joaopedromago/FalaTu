import { Component } from '@angular/core';
import { chatsSeed } from '../../services/seeds';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public chats = chatsSeed;
  constructor() {
    console.log(this.chats);
  }

}
