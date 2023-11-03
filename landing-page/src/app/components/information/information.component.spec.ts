/* eslint-disable prefer-const */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';
import { of } from 'rxjs';
import { InformationComponent } from './information.component';
import { ProjectionSectionRs } from 'src/app/core/interface/project_section_rs.interface';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  const MOCK_PARAMETER: ProjectionSectionRs[] = [
    {
        id: 1,
        content_title: "Motivacion",
        content: "Este sistema web ha sido creado como un sistema buscador ontologico, el cual tiene la capacidad de realizar busquedas profundas",
    },
    {
        id: 2,
        content_title: "Información",
        content: "Este sistema web ha sido creado como un sistema buscador ontologico, el cual tiene la capacidad de realizar busquedas profundas",
    },
    {
        id: 3,
        content_title: "Principios",
        content: "Este sistema web ha sido creado como un sistema buscador ontologico, el cual tiene la capacidad de realizar busquedas profundas",
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockParameterService: any;
  mockParameterService = jasmine.createSpyObj('ParameterService',['getAboutProjectSection']);
  mockParameterService.getAboutProjectSection.and.returnValue(of(MOCK_PARAMETER));
   
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ParameterService, useValue: mockParameterService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
