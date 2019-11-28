import { Component, OnInit } from "@angular/core";
import { myProfile, chatsSeed } from "src/services/seeds";
import { User } from "src/model";
import { Storage } from "@ionic/storage";
import { MessageService } from "src/services";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  public user: User;
  public personData;
  public currentChatKey: string;

  public messageInput: string = "";

  public messageExibition: any = [];

  constructor(
    private storage: Storage,
    private messageService: MessageService
  ) {
    this.loadUser();
  }

  private loadUser() {
    this.storage.get("user").then(result => {
      this.user = JSON.parse(result);

      this.storage.get("currentChat").then(result => {
        this.personData = Object.entries(this.user.chat)
          .map(element => {
            return { key: element[0], ...element[1] };
          })
          .filter(x => x.key === result)[0];
        this.personData.Message = this.personData.Message || [];
        this.loadMessages();
      });
    });
  }

  ngOnInit() {}

  loadMessages() {
    this.messageExibition = Object.entries(this.personData.Message).map(
      element => {
        return { ...element[1], key: element[0] };
      }
    );
  }

  sendMessage() {
    const message = {
      sentByMe: true,
      message: this.messageInput,
      date: new Date().toISOString()
    };
    this.messageInput = "";
    this.messageExibition.push(message);

    const chat = {
      ...this.personData,
      lastMsg: message.message,
      lastMsgDate: message.date
    };
    this.messageService
      .updateChat(this.user.key, this.personData.key, chat)
      .then(result => {
        this.messageService.insert(this.user.key, this.personData.key, message);
      });
  }
}
