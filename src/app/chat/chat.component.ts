import { Component, OnInit } from '@angular/core';
import { myProfile, chatsSeed } from 'src/services/seeds';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public profile = myProfile;
  public personData = chatsSeed[0];

  constructor() { }

  ngOnInit() {}

}
