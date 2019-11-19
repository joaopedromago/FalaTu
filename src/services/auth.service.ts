import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of as ObservableOf, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase";

@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signup(login: string, senha: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(login, senha);
  }

  login(login: string, senha: string) {
    this.afAuth.auth.signInWithEmailAndPassword(login, senha);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
}
