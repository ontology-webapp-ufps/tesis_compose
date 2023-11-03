import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.css']
})

export class PrimaryButtonComponent {

  @Input() textButton!: string;
  @Input() isEnabled!: boolean;
  @Output() isClicked = new EventEmitter<boolean>();

  isClickedButton(){
    this.isClicked.emit(true);
  }

}
