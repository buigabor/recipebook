import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './recipe-home.component.html',
  styleUrls: ['./recipe-home.component.css'],
})
export class RecipeHomeComponent implements OnInit {
  noRecipesFetched: boolean;
  headerSub: Subscription;
  constructor(private store: Store<fromAppReducer.AppState>) {}

  ngOnInit(): void {
    this.store.select('recipes').subscribe((recipesState) => {
      if (recipesState.recipes.length === 0) {
        this.noRecipesFetched = true;
      }
    });
  }
}
