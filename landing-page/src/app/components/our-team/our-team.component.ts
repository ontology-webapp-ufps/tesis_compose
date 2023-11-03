import { Component } from '@angular/core';
import { TeamSectionRs } from 'src/app/core/interface/team_section_rs.interface';
import { ParameterService } from 'src/app/core/services/parameters-service/parameter.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent {

  teamMembers: TeamSectionRs[] = [];

  constructor(private parameterService: ParameterService){
    this.parameterService.getOurTeamSection().subscribe((response) => {
      this.teamMembers = response
    })
  }

}
