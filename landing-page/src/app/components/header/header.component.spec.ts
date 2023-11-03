/* eslint-disable prefer-const */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';
import { MainSectionRs } from 'src/app/core/interface/main_section_rs.interface';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const MOCK_PARAMETER: MainSectionRs[] = [{
    id: 1,
    main_title: "UFPS - GIA",
    content_title: "Buscador Ontologico",
    content: "Este sistema web ha sido creado como un sistema buscador ontologico, el cual tiene la capacidad de realizar busquedas profundas",
    image: "http://urldeimagen.com"
  }];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockParameterService: any;
  mockParameterService = jasmine.createSpyObj('ParameterService',['getMainSection']);
  mockParameterService.getMainSection.and.returnValue(of(MOCK_PARAMETER));
   
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ParameterService, useValue: mockParameterService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
