import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchRq, BodySearch } from 'src/app/core/models/ontology.interface';
import { OntologyService } from 'src/app/core/services/ontology-service/ontology-service';
import { StorageService } from 'src/app/core/services/storage-service/storage-service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {

  loader = false;

  searchParams!: FormGroup;
  session_token: string;
  result: BodySearch | undefined;

  @Output() sessionChange = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder,
    private storageService: StorageService,
    private ontologyService: OntologyService
  ) {
    this.searchParams = fb.group({
      criteria: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
      accuracy: ['', [Validators.required, Validators.min(50), Validators.max(100)]],
      format: ['', [Validators.required,  Validators.minLength(2)]]
    });
    this.session_token = this.obtainToken();
  }

  actionButton() {
    const request: SearchRq = {
      keyWords: this.searchParams.controls['criteria'].value,
      formato: this.searchParams.controls['format'].value,
      umbral: this.searchParams.controls['accuracy'].value,
      lang: ""
    }

    this.loader = true;
    this.ontologyService.searchOntology(this.session_token, request).subscribe(
      (response) => {
        this.loader = false;
        this.result = response.body;
        console.log(response);
      }
    );

  }

  private obtainToken(){
    const session_token = this.storageService.getCurrentToken();

    if (session_token === null) {
      this.sessionChange.emit(true);
    }

    return session_token ?? '';
  }

}
