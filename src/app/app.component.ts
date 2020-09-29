import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ShoppingCart';
  currentPage = 'recipes';
  showPage(page: string) {
    this.currentPage = page;
  }
}
