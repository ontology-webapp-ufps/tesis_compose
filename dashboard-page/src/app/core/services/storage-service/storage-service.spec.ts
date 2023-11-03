import { Session } from "../../models/session.interface";
import { StorageService } from "./storage-service";

describe('StorageService', () => {
  let service: StorageService;

  const MOCK_SESSION: Session = {
    token: "token_mi_app",
    user: {
      name: "vannessa",
      email: "vanessa@ufps.edu.co",
      rol: 1,
      id: 1
    }
  }

  beforeEach(() => {
    service = new StorageService();
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe deber el current session', () => {
    service.getCurrentSession();
  });

  it('Debe deber el current token', () => {
    service.getCurrentToken();
  });

  it('Debe deber el current user', () => {
    service.removeCurrentSession();
    service.getCurrentUser();

    service.setCurrentSession(MOCK_SESSION);
    service.getCurrentUser();
  });

  it('Debe validar si el usuario se ha autenticado', () => {
    service.removeCurrentSession();
    service.isAuthenticated();
    service.setCurrentSession(MOCK_SESSION);    
    service.isAuthenticated();
  });

  it('Debe realizar un logout de la aplicación', () => {
    service.logout();
  });
});
