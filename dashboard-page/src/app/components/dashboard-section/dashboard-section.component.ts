import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-section',
  templateUrl: './dashboard-section.component.html',
  styleUrls: ['./dashboard-section.component.css']
})
export class DashboardSectionComponent {

    @Input () page!: number;
    @Output() sessionChange = new EventEmitter<boolean>();

    doLogout(event: boolean) {
        this.sessionChange.emit(event);
    }

}
