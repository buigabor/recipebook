import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeDetail = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Recipe',
      'Test recipe desc',
      'https://get.pxhere.com/photo/dish-meal-food-vegetable-recipe-cuisine-vegetarian-food-parmigiana-1417897.jpg'
    ),
    new Recipe(
      'Eggs benedict',
      'Eggs and benedict and eggs',
      'https://upload.wikimedia.org/wikipedia/commons/e/ec/Eggs_Benedict-01.jpg'
    ),
    new Recipe(
      'Lamb easter meal tasty yum',
      'Lamb with potato and salad',
      'https://cdn.pixabay.com/photo/2018/09/27/22/37/lamb-3708116_1280.jpg'
    ),
  ];
  constructor() {}

  onRecipeSelected(recipeDetail: Recipe) {
    this.recipeDetail.emit(recipeDetail);
  }

  ngOnInit(): void {}
}
