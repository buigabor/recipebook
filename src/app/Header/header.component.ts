import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() selectedPage = new EventEmitter<string>();
  collapsed = true;

  onSelect(page: string) {
    this.selectedPage.emit(page);
  }
}
