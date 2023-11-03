import { Component } from '@angular/core';
import { StorageService } from './core/services/storage-service/storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth';

  formType = 0;

  constructor(
    private storageService: StorageService) 
  {
    if(this.storageService.isAuthenticated()) {    
      const base_url = window.location.href.split('/auth')[0];
      window.location.href = base_url + '/dashboard';
    }
  }

}
