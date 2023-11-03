import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GetFuentesRs, GetSearchRs, SearchRq } from '../../models/ontology.interface';

@Injectable({
  providedIn: 'root',
})
export class OntologyService {
  private SERVICE_URL: string;

  constructor(private http: HttpClient) {
    this.SERVICE_URL = environment.ontology_service;
  }

  getFuentes(token: string): Observable<GetFuentesRs> {
    const serviceUrl = this.SERVICE_URL + '/getFuentes';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.get<GetFuentesRs>(serviceUrl, { headers: headers });
  }

  deleteFuentes(token: string, ontology: string): Observable<GetFuentesRs> {
    const serviceUrl = this.SERVICE_URL + '/remove/' + ontology;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.delete<GetFuentesRs>(serviceUrl, { headers: headers });
  }

  addOntologyWeb(token: string, ontology: string): Observable<GetFuentesRs> {
    const serviceUrl = this.SERVICE_URL + '/add/' + ontology;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.post<GetFuentesRs>(serviceUrl, { headers: headers });
  }

  searchOntology(token: string, search: SearchRq): Observable<GetSearchRs> {
    const serviceUrl = this.SERVICE_URL + '/search';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    })
    return this.http.post<GetSearchRs>(serviceUrl, search, { headers: headers });
  }

}