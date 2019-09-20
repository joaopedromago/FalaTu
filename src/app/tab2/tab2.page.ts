import { Component } from '@angular/core';
import { myProfile } from 'src/services/seeds';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public profile = myProfile;
  constructor() {}

}
