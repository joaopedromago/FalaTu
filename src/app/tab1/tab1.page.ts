import { Component } from "@angular/core";
import { chatsSeed } from "../../services/seeds";
import { User } from "src/model";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { UserService } from "src/services";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  public user: User;
  public chats = [];
  public recentChats = [];
  public onlineChats = [];
  public offlineChats = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private userService: UserService
  ) {
    this.storage.get("user").then(result => {
      const key = JSON.parse(result).key;
      this.userService.getUserByKey(key).subscribe((userResult: any) => {
        this.user = userResult;
        this.storage.set("user", JSON.stringify(this.user)).then(() => {
          this.chats = Object.entries(this.user.chat).map(element => {
            return { key: element[0], ...element[1] };
          });

          this.loadRecentChats();
          this.loadOnlineChats();
          this.loadOfflineChats();
        });
      });
    });
  }

  private loadRecentChats() {
    this.recentChats = this.chats;

    this.recentChats.sort(function(a, b) {
      const dateA: any = new Date(a.dataUltimaMsg);
      const dateB: any = new Date(b.dataUltimaMsg);
      return dateB - dateA;
    });
    this.recentChats = this.recentChats.slice(0, 4);
  }

  private loadOnlineChats() {
    this.onlineChats = this.chats.filter(x => x.status === "online");
    this.onlineChats = this.onlineChats.slice(0, 4);
  }

  private loadOfflineChats() {
    this.offlineChats = this.chats.filter(x => x.status === "offline");
    this.offlineChats = this.offlineChats.slice(0, 4);
  }

  public goToConversaiton(key) {
    this.storage.set("currentChat", key).then(async () => {
      await setTimeout(async () => {
        await this.router.navigate(["/chat"]);
      });
    });
  }
}
