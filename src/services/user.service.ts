import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { User } from "../model";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

export class UserService {
  constructor(private db: AngularFireDatabase) {}

  insert(User: User) {
    this.db
      .list("User")
      .push(User)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(User: User, key: string) {
    this.db
      .list("User")
      .update(key, User)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() {
    return this.db
      .list("User")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`User/${key}`).remove();
  }
}
