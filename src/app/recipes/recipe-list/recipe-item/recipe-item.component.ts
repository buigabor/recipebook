import { Component, Input, OnInit } from '@angular/core';
import { swimUp } from 'src/app/animations';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: [swimUp],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}
}
