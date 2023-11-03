/* eslint-disable prefer-const */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/core/services/user-service/user-service';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';
import { of } from 'rxjs';
import { LoginRs } from 'src/app/core/models/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStorageService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockUserService: any;

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

  const MOCK_LOGIN_FAILED: LoginRs = {
    api_code: 2,
    mensaje: "Login fallido, credenciales incorrectas.",
  }

  mockUserService = jasmine.createSpyObj('UserService',['doLogin']);
  mockUserService.doLogin.and.returnValue(of(MOCK_LOGIN_SUCESS));

  mockStorageService = jasmine.createSpyObj('StorageService',['setCurrentSession']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService},
        { provide: StorageService, useValue: mockStorageService},
      ],
      declarations: [ LoginComponent ],
      schemas : [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login user failed', () => {
    mockUserService.doLogin.and.returnValue(of(MOCK_LOGIN_FAILED));
    component.actionButton();
  });

});
