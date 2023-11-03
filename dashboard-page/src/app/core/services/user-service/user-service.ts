import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UpdateUserRq, UpdateUserRs, UserData } from '../../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private SERVICE_URL: string;

  constructor(private http: HttpClient) {
    this.SERVICE_URL = environment.user_service
  }

  getUsers(token: string): Observable<UserData[]> {
    const serviceUrl = this.SERVICE_URL + '/user_report';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<UserData[]>(serviceUrl, { headers: headers });
  }

  updateUser(token: string, user: UpdateUserRq): Observable<UpdateUserRs> {
    const serviceUrl = this.SERVICE_URL + '/update_user';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<UpdateUserRs>(serviceUrl, user, { headers: headers });
  }

  deleteUser(token: string, user_code: number): Observable<UpdateUserRs> {
    const serviceUrl = this.SERVICE_URL + '/delete_user';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<UpdateUserRs>(serviceUrl, {'id': user_code}, { headers: headers });
  }

}
