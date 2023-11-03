import { of } from "rxjs";
import { ParameterService } from "./parameter.service";
import { TeamSectionRs } from "../../interface/team_section_rs.interface";
import { ProjectionSectionRs } from "../../interface/project_section_rs.interface";
import { MainSectionRs } from "../../interface/main_section_rs.interface";

describe('ParameterService', () => {
  let service: ParameterService;
  let httpClientSpy: { get: jasmine.Spy };

  const MOCK_PARAMETER_TEAM: TeamSectionRs[] = [
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

  const MOCK_PARAMETER_PROJECT: ProjectionSectionRs[] = [
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

  const MOCK_PARAMETER_MAIN: MainSectionRs[] = [{
    id: 1,
    main_title: "UFPS - GIA",
    content_title: "Buscador Ontologico",
    content: "Este sistema web ha sido creado como un sistema buscador ontologico, el cual tiene la capacidad de realizar busquedas profundas",
    image: "http://urldeimagen.com"
  }];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service = new ParameterService(httpClientSpy as any);
  });

  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Debe de retonar la información de la página principal', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_PARAMETER_MAIN));
    service.getMainSection().subscribe((resultado) => {
      expect(resultado).toEqual(MOCK_PARAMETER_MAIN);
      done();
    });
  });

  it('Debe de retonar la información de la página principal', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_PARAMETER_PROJECT));
    service.getAboutProjectSection().subscribe((resultado) => {
      expect(resultado).toEqual(MOCK_PARAMETER_PROJECT);
      done();
    });
  });

  it('Debe de retonar la información de la página principal', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(MOCK_PARAMETER_TEAM));
    service.getOurTeamSection().subscribe((resultado) => {
      expect(resultado).toEqual(MOCK_PARAMETER_TEAM);
      done();
    });
  });
});
