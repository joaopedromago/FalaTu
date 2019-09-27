import { Component, OnInit } from '@angular/core';
import { myProfile, matchesSeeds } from 'src/services/seeds';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {

  public current = 0;

  public profile = myProfile;

  public matches = matchesSeeds;

  constructor() { }

  ngOnInit() {}

  public showNext(){
    this.current++;
  }
}
