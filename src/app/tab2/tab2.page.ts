import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "src/model";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  public user: User;

  constructor(private storage: Storage) {
    this.storage.get("user").then(result => {
      this.user = JSON.parse(result);
    });
  }
}
