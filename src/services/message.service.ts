import { map } from "rxjs/operators";
import { Message } from "../model";
import { AngularFireDatabase } from "angularfire2/database";

export class MessageService {
  constructor(private db: AngularFireDatabase) {}

  insert(userId: string, chatId: string, message: Partial<Message>) {
    return this.db.list(`/User/${userId}/chat/${chatId}/Message`).push(message);
  }

  updateChat(userId: string, chatId: string, chat: any) {
    return this.db.list(`/User/${userId}/chat`).update(chatId, chat);
  }
}
