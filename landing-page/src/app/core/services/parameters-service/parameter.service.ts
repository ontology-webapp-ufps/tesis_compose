import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainSectionRs } from '../../interface/main_section_rs.interface';
import { ProjectionSectionRs } from '../../interface/project_section_rs.interface';
import { TeamSectionRs } from '../../interface/team_section_rs.interface';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private SERVICE_URL: string;

  constructor(private http: HttpClient) {
    this.SERVICE_URL =  window.location.href.split('/index')[0] + '/parameters'
  }

  getMainSection(): Observable<MainSectionRs[]> {
    const serviceUrl = this.SERVICE_URL + '/main_section';
    this.waiting(100);
    return this.http.get<MainSectionRs[]>(serviceUrl);
  }

  getAboutProjectSection(): Observable<ProjectionSectionRs[]> {
    const serviceUrl = this.SERVICE_URL + '/project_section';
    this.waiting(350);
    return this.http.get<ProjectionSectionRs[]>(serviceUrl);
  }

  getOurTeamSection(): Observable<TeamSectionRs[]> {
    const serviceUrl = this.SERVICE_URL + '/team_section';
    this.waiting(200);
    return this.http.get<TeamSectionRs[]>(serviceUrl);
  }

  private waiting(timeout: number){
    setTimeout(()=> console.log('waiting'), timeout);
  }

}
