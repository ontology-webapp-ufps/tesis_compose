import { Component } from '@angular/core';
import { MainSectionRs } from 'src/app/core/interface/main_section_rs.interface';
import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  parameters: MainSectionRs[] = [];

  constructor(private parameterService: ParameterService) {
    this.parameterService.getMainSection().subscribe((response) => {
      this.parameters = response
    })
  }

}
