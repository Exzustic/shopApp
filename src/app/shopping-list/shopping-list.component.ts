import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Recipe} from "../recipes/recipe.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientsChanges.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      });
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
