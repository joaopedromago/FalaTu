import { Component } from '@angular/core';
import { myProfile } from 'src/services/seeds';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public profile = myProfile;
  constructor() { }

}
