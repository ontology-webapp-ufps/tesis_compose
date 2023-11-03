import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() page = new EventEmitter<number>();

  role;

  constructor(private storageService: StorageService) {
    const localStorageRole = this.storageService.getCurrentUser()?.rol;

    if(localStorageRole === undefined) {
      this.logout();
    } else {
      this.role = localStorageRole;
    }
  }

  searchPage(){
    this.page.emit(0);
  }

  userPage(){
    this.page.emit(1);
  }

  ontologyPage(){
    this.page.emit(2);
  }

  logout(){
    this.page.emit(-1);
  }

}
