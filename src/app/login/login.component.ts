import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/services";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.storage.get("credential").then(credential => {
      if (credential != null) {
        this.router.navigate(["/tabs/tab1"]);
      }
    });
  }

  ngOnInit() {}

  public login() {
    this.authService.login();
  }
}
