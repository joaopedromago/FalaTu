import { Component } from "@angular/core";
import { AuthService, UserService } from "src/services";
import { Storage } from "@ionic/storage";
import { User } from "src/model";
import { myProfile } from "src/services/seeds";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  public profile: User;
  public key: string;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private userService: UserService
  ) {
    this.storage.get("user").then(result => {
      const user = JSON.parse(result);
      this.profile = user;
      this.key = user.key;
    });
  }

  public updateUser() {
    const updatedUser = { ...this.profile, key: null };
    delete updatedUser.key;
    this.userService.update(updatedUser, this.key);
    this.storage.set("user", JSON.stringify({ ...updatedUser, key: this.key }));
    console.log("updated...");
  }

  public logout() {
    this.authService.logout();
  }
}
