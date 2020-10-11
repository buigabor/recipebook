import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class AuthModule {}
