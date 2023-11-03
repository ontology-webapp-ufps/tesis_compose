import { Component } from '@angular/core';
import { ProjectionSectionRs } from 'src/app/core/interface/project_section_rs.interface';
import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  parameters: ProjectionSectionRs[] = [];

  constructor(
    private parameterService: ParameterService) {
    this.parameterService.getAboutProjectSection().subscribe((response) => {
      this.parameters = response;
    })
  }

  redirectLogin() {
    const base_url = window.location.href.split('/index')[0];
    window.location.href = base_url + '/auth'
  }

}
