import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DropdownDirective, LoadingSpinnerComponent, AlertComponent],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    CommonModule,
  ],
})
export class SharedModule {}
