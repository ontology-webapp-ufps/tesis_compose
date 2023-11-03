import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OntologyService } from 'src/app/core/services/ontology-service/ontology-service';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';

@Component({
  selector: 'app-ontology-section',
  templateUrl: './ontology-section.component.html',
  styleUrls: ['./ontology-section.component.css']
})
export class OntologySectionComponent {

  isAuthorized = false;
  isAddOntology = false;
  isWebOntology = true;
  loader = false;

  session_token: string;
  ontologies: string[] = [];

  ontologyForm!: FormGroup;
  
  @Output() sessionChange = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder,
    private storageService: StorageService,
    private ontologyService: OntologyService,
  ) {
    this.ontologyForm = fb.group({
      path: ['', [Validators.required]],
    });
    this.session_token = this.obtainToken();
    this.getOntologies();
  }

  deleteOntology(event: string) {
    const ontology = event.split('<br>')[1];
    this.ontologyService.deleteFuentes(this.session_token, ontology).subscribe((response) => {
      alert(response.body.message);
      this.getOntologies();
    })
  }
  
  actionButton() {
    this.isAddOntology = true;
    console.log('open form ontology');
  }

  changeType(event: boolean) {
    this.isWebOntology = event;
  }

  addOntology(event: boolean) {
    if(event && this.isWebOntology) {
      this.loader = true;
      this.ontologyService.addOntologyWeb(this.session_token, this.ontologyForm.controls['path'].value).subscribe( 
        (response) => {
          alert(response.body.message)
          this.getOntologies();
          this.ontologyForm.reset();
          this.loader = false;
        }
      );
    } else if(event && !this.isWebOntology){
      console.log('desarrollar añadir desde file')
    } else {
      this.isAddOntology = false;
      this.isWebOntology = true;
    }

  }

  private obtainToken(){
    this.isAuthorized = this.storageService.getCurrentUser()?.rol === undefined || this.storageService.getCurrentUser()?.rol === 2;
    const session_token = this.storageService.getCurrentToken();

    if (session_token === null) {
      this.sessionChange.emit(true);
    }

    return session_token ?? '';
  }

  private getOntologies(){
    this.ontologyService.getFuentes(this.session_token).subscribe( (response) => {
      this.ontologies = response.body.result;
      this.ontologies.reverse();
    });
    this.isAddOntology = false;
    this.isWebOntology = true;
  }


}
