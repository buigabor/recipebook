import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListEditComponent],
  imports: [RouterModule.forChild(routes), FormsModule, SharedModule],
})
export class ShoppingListModule {}
