/* eslint-disable prefer-const */
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StorageService } from './core/services/storage-service/storage-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStorageService: any;
  mockStorageService = jasmine.createSpyObj('StorageService',['isAuthenticated']);
  mockStorageService.isAuthenticated.and.returnValue(of(true));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService},
      ],      
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'auth'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('auth');
  });

});
