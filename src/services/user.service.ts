import { map } from "rxjs/operators";
import { User } from "../model";
import { AngularFireDatabase } from "angularfire2/database";
import { auth } from "firebase";

export class UserService {
  constructor(private db: AngularFireDatabase) {}

  getUser(credential: auth.UserCredential) {
    return this.db
      .list("User", ref =>
        ref.orderByChild("email").equalTo(credential.user.email)
      )
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  insert(User: User) {
    return this.db.list("User").push(User);
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
