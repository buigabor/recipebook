import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),

  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),

  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((_, index) => {
      return index !== state.editIndex;
    }),
    editIndex: -1,
  })),

  on(ShoppingListActions.updateIngredient, (state, action) => ({
    ...state,
    ingredients: state.ingredients.map((ingredient, index) => {
      return index === state.editIndex ? { ...action.ingredient } : ingredient;
    }),
    editIndex: -1,
  })),

  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editIndex: action.index,
  })),

  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editIndex: -1,
  }))
);

export function shoppingListReducer(state: State, action: Action) {
  return _shoppingListReducer(state, action);
}

// import { Ingredient } from './../../shared/ingredient.model';
// import * as ShoppingListActions from './shopping-list.actions';

// export interface State {
//   ingredients: Ingredient[];
//   editedIngredient: Ingredient;
//   editedIngredientIndex: number;
// }

// const initialState: State = {
//   ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
//   editedIngredient: null,
//   editedIngredientIndex: -1,
// };

// export function shoppingListReducer(
//   state = initialState,
//   action: ShoppingListActions.ShoppingListActions
// ): State {
//   switch (action.type) {
//     case ShoppingListActions.ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, action.payload],
//       };

//     case ShoppingListActions.ADD_INGREDIENTS:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, ...action.payload],
//       };

//     case ShoppingListActions.UPDATE_INGREDIENT:
//       const ingredientOld = state.ingredients[state.editedIngredientIndex];
//       const updatedIngredient = {
//         ...ingredientOld,
//         ...action.payload,
//       };
//       const updatedIngredients = [...state.ingredients];
//       updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
//       return {
//         ...state,
//         ingredients: updatedIngredients,
//         editedIngredient: null,
//         editedIngredientIndex: -1,
//       };

//     case ShoppingListActions.DELETE_INGREDIENT:
//       return {
//         ...state,
//         ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
//           return ingredientIndex !== state.editedIngredientIndex;
//         }),
//         editedIngredient: null,
//         editedIngredientIndex: -1,
//       };

//     case ShoppingListActions.START_EDIT:
//       return {
//         ...state,
//         editedIngredient: { ...state.ingredients[action.payload] },
//         editedIngredientIndex: action.payload,
//       };

//     case ShoppingListActions.END_EDIT:
//       return { ...state, editedIngredient: null, editedIngredientIndex: -1 };
//     default:
//       return state;
//   }
// }
