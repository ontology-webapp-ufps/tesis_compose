import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() inputType!: string;
  @Input() placeHolder!: string;
  @Input() iconUrl!: string;
  @Input() validateText!: string;
  @Input() icon!: string;
  @Input() background?: string;
  @Input() padding_left!: string;
  @Input() isIcon!: boolean;

  @Input() set control(value: AbstractControl) {
    if (this.formControl !== value) {
      this.formControl = value as FormControl;
    }
  }

  formControl!: FormControl;

}
