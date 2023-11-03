import { of } from "rxjs";
import { UserService } from "./user-service";

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: {
      post: jasmine.Spy 
};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service = new UserService(httpClientSpy as any);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

});
