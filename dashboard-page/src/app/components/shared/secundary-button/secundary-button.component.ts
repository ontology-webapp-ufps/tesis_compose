import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-secundary-button',
  templateUrl: './secundary-button.component.html',
  styleUrls: ['./secundary-button.component.css']
})
export class SecundaryButtonComponent {

  @Input() textButton!: string;
  @Input() isEnabled!: boolean;
  @Output() isClicked = new EventEmitter<boolean>();

  isClickedButton(){
    this.isClicked.emit(true);
  }

}
