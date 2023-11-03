import { of } from "rxjs";
import { LoginRq, LoginRs } from "../../models/user.interface";
import { UserService } from "./user-service";

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: {
      post: jasmine.Spy 
};

  const MOCK_LOGIN_SUCESS: LoginRs = {
    api_code: 1,
    mensaje: "Autenticación exitosa",
    token: "token_mi_app",
    user: {
      name: "vannessa",
      email: "vanessa@ufps.edu.co",
      rol: 1,
      id: 1
    }
  }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service = new UserService(httpClientSpy as any);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe hacer login del usuario', (done: DoneFn) => {
    httpClientSpy.post.and.returnValue(of(MOCK_LOGIN_SUCESS));
    const request: LoginRq = {
        email: 'vanessa@ufps.edu.co',
        contrasena: '123456'
    }
    service.doLogin(request).subscribe((resultado) => {
      expect(resultado).toEqual(MOCK_LOGIN_SUCESS);
      done();
    });
  });

});
