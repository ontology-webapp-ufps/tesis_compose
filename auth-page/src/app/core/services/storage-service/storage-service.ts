import { Injectable } from "@angular/core";
import { Session } from "../../models/session.interface";
import { User } from "../../models/user.interface";

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private localStorageService;
  private currentSession : Session | null= null;

  constructor() {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('ontology_user', JSON.stringify(session));
  }

  loadSessionData(): Session | null {
    // eslint-disable-next-line no-var
    var sessionStr = this.localStorageService.getItem('ontology_user');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('ontology_user');
    this.currentSession = null;
  }

  getCurrentUser(): User | null {
    // eslint-disable-next-line no-var
    var session: Session | null = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken(): string | null {
    // eslint-disable-next-line no-var
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  logout(): void{
    this.removeCurrentSession();
  }

}
