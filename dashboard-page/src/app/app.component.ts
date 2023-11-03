import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage-service/storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashboard';
  page = 0;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {    
    if (!this.storage.isAuthenticated()) {
      this.redirectIndex();
    }
  }

  logout() {
    this.storage.removeCurrentSession();
    this.redirectIndex();
  }

  changePage(event: number) {
    if(event === -1) {
      this.logout();
    } else {
      this.page = event;
    }
  }

  private redirectIndex() {
    const base_url = window.location.href.split('/dashboard')[0];
    window.location.href = base_url + '/index';
  }


}
