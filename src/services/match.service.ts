import { map } from "rxjs/operators";
import { Match } from "../model";
import { AngularFireDatabase } from "angularfire2/database";

export class MatchService {
  constructor(private db: AngularFireDatabase) {}

  getMatch(key: string) {
    return this.db
      .list(`Matches/${key}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  insert(Match: Partial<Match>) {
    return this.db.list("Matches").push(Match);
  }

  update(Match: Match, key: string) {
    this.db
      .list("Matches")
      .update(key, Match)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() {
    return this.db
      .list("Matches")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`Match/${key}`).remove();
  }
}
