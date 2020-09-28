import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
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
  ];
  constructor() {}

  ngOnInit(): void {}
}
