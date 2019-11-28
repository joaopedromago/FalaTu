import { Component, OnInit } from "@angular/core";
import { MatchService } from "src/services";
import { Match, User } from "src/model";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  public current = 0;

  public user: User;

  public matches: Match[] = [];

  constructor(private matchService: MatchService) {
    this.matchService.getAll().subscribe((result: any) => {
      this.matches = result;
    });
  }

  ngOnInit() {}

  public showNext() {
    this.current++;
  }

  public clearCount() {
    this.current = 0;
  }
}
