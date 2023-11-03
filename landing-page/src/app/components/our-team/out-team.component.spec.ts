/* eslint-disable prefer-const */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';
import { of } from 'rxjs';
import { OurTeamComponent } from './our-team.component';
import { TeamSectionRs } from 'src/app/core/interface/team_section_rs.interface';

describe('OurTeamComponent', () => {
  let component: OurTeamComponent;
  let fixture: ComponentFixture<OurTeamComponent>;

  const MOCK_PARAMETER: TeamSectionRs[] = [
    {
        email: "juancamilohp@ufps.edu.co",
        role: "Tesista",
        name: "Juan Camilo Hernández Parra",
        id: 1,
        img: "https://imagen_juan.com"
    },
    {
        email: "josemanoloph@ufps.edu.co",
        role: "Tesista",
        name: "Jose Manolo Pinzon Hernandez",
        id: 2,
        img: "https://imagen_juan.com"
    },
    {
        email: "eduardpuerto@ufps.edu.co",
        role: "Director",
        name: "Eduard Gilberto Puerto Cuadros",
        id: 3,
        img: "https://imagen_juan.com"
    }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockParameterService: any;
  mockParameterService = jasmine.createSpyObj('ParameterService',['getOurTeamSection']);
  mockParameterService.getOurTeamSection.and.returnValue(of(MOCK_PARAMETER));
   
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurTeamComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ParameterService, useValue: mockParameterService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
