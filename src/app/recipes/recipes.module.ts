
import { SharedModule } from './../shared/shared.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeHomeComponent,
    RecipeEditComponent,
  ],
  imports: [RecipesRoutingModule, SharedModule, ReactiveFormsModule],
  // exports: [
  //   RecipesComponent,
  //   RecipeListComponent,
  //   RecipeDetailComponent,
  //   RecipeItemComponent,
  //   RecipeHomeComponent,
  //   RecipeEditComponent,
  // ],
})
export class RecipesModule {}
