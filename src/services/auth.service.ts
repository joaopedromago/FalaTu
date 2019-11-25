import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of as ObservableOf, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";
import * as firebase from "firebase/app";
import { Storage } from "@ionic/storage";
import { UserService } from "./user.service";
import { User } from "src/model";

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public provider: auth.GoogleAuthProvider;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private userService: UserService
  ) {
    this.user = afAuth.authState;
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  login() {
    this.afAuth.auth.signInWithPopup(this.provider).then(res => {
      this.storage.set("credential", res.credential).then(() => {
        this.userService.getUser(res).subscribe(user => {
          if (user.length == 0) {
            const newUser = this.getNewUser(res);
            this.userService.insert(newUser).then(result => {
              const currentUser = {
                key: result.key,
                ...newUser
              };
              this.storage.set("user", JSON.stringify(currentUser)).then(() => {
                this.router.navigate(["/tabs/tab1"]);
              });
            });
          } else {
            this.storage.set("user", JSON.stringify(user[1])).then(() => {
              this.router.navigate(["/tabs/tab1"]);
            });
          }
        });
      });
    });
  }

  getNewUser(res: auth.UserCredential): User {
    const { user } = res;

    return {
      name: user.displayName,
      email: user.email,
      birth: null,
      range: 20,
      pic: null,
      matchPic: null
    };
  }

  logout() {
    this.afAuth.auth.signOut();
    this.storage.remove("user");
    this.storage.remove("credential").then(() => {
      this.router.navigate(["/login"]);
    });
  }
}
