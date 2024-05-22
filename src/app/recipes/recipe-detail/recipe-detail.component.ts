import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent{
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
