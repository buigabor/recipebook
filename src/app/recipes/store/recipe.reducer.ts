// ********************************* NGRX New Syntax(V8) *********************************

import { createReducer, on, Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState = {
  recipes: [],
};

// tslint:disable-next-line: variable-name
const _recipeReducer = createReducer(
  initialState,
  on(RecipesActions.addRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.concat({ ...action.recipe }),
  })),

  on(RecipesActions.updateRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.map((recipe, index) => {
      if (index === action.index) {
        return { ...action.newRecipe };
      } else {
        return recipe;
      }
    }),
  })),

  on(RecipesActions.deleteRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.filter((recipe, index) => {
      return index !== action.index;
    }),
  })),

  on(RecipesActions.setRecipes, (state, action) => ({
    ...state,
    recipes: [...action.recipes],
  }))
);

export function recipeReducer(state: State, action: Action): State {
  return _recipeReducer(state, action);
}

// ********************************* NGRX Old Syntax *********************************

// import { Recipe } from './../recipe.model';
// import * as RecipesActions from './recipe.actions';

// export interface State {
//   recipes: Recipe[];
// }

// const initialState: State = {
//   recipes: [],
// };

// export function recipeReducer(
//   state = initialState,
//   action: RecipesActions.RecipesActions
// ): State {
//   switch (action.type) {
//     case RecipesActions.SET_RECIPES:
//       return {
//         ...state,
//         recipes: [...action.payload],
//       };

//     case RecipesActions.ADD_RECIPE:
//       return {
//         ...state,
//         recipes: [...state.recipes, action.payload],
//       };

//     case RecipesActions.UPDATE_RECIPE:
//       const updatedRecipe = {
//         ...state.recipes[action.payload.index],
//         ...action.payload.newRecipe,
//       };

//       const updatedRecipes = [...state.recipes];
//       updatedRecipes[action.payload.index] = updatedRecipe;

//       return {
//         ...state,
//         recipes: updatedRecipes,
//       };

//     case RecipesActions.DELETE_RECIPE:
//       return {
//         ...state,
//         recipes: state.recipes.filter((recipe, index) => {
//           return index !== action.payload;
//         }),
//       };
//     default:
//       return state;
//   }
// }
