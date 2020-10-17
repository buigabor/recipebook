import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import * as ShoppingListAcions from './store/shopping-list.actions';
import * as fromAppRecuer from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private ingredientChangeSub: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromAppRecuer.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {}

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListAcions.StartEdit(index));
  }
}
