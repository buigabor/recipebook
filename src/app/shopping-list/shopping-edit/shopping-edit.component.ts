import { Ingredient } from './../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  constructor(private store: Store<fromAppReducer.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        const index = stateData.editIndex;
        if (index > -1) {
          this.editMode = true;
          this.editedItem = stateData.ingredients[index];
          this.shoppingEditForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.deleteIngredient());
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.store.dispatch(
        ShoppingListActions.addIngredient({ ingredient: newIngredient })
      );
    } else {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({ ingredient: newIngredient })
      );
    }
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.shoppingEditForm.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onDelete(): void {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }
}
