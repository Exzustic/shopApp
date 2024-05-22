import {Component, Input} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  providers: [RecipeService]
})
export class RecipesComponent {
  protected readonly onselect = onselect;
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeSelected.subscribe(
      (recipe) => {
        this.selectedRecipe = recipe;
      });
  }

/*  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }*/
}
