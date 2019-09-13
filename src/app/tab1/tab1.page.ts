import { Component } from '@angular/core';
import { chatsSeed } from '../../services/seeds';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public chats = [];
  public recentChats = [];
  public onlineChats = [];
  public offlineChats = [];

  constructor() {
    this.chats = chatsSeed;
    this.loadRecentChats();
    this.loadOnlineChats();
    this.loadOfflineChats();
  }

  private loadRecentChats(){
    this.recentChats = this.chats;
    
    this.recentChats.sort(function(a, b) {
      const dateA:any = new Date(a.dataUltimaMsg);
      const dateB:any = new Date(b.dataUltimaMsg);
      return dateB - dateA;
  });
  this.recentChats = this.recentChats.slice(0,4);
  }
  
  private loadOnlineChats(){
    this.onlineChats = this.chats.filter(x=>x.status==='online');    
  }
  
  private loadOfflineChats(){
    this.offlineChats = this.chats.filter(x=>x.status==='offline');    
  }
}
