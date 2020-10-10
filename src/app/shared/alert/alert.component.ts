import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message: string;
  @Output() closeThis = new EventEmitter<void>();

  onClose(): void {
    this.closeThis.emit();
  }
}
