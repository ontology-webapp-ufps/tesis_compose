import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginRq, LoginRs } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private SERVICE_URL: string;

  constructor(private http: HttpClient) {
    this.SERVICE_URL = environment.user_service
  }

  doLogin(user_data: LoginRq): Observable<LoginRs> {
    const serviceUrl = window.location.href.split('/auth')[0] + '/users/login';
    return this.http.post<LoginRs>(serviceUrl, user_data);
  }

}
