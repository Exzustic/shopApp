import {Recipe} from "./recipe.model";
   import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "First recipe",
      "First description",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      [
        new Ingredient("Meat", 1),
        new Ingredient("French Fries", 20)
      ]),
    new Recipe(
      "Second recipe",
      "Second description",
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      [
        new Ingredient("Bread", 2),
        new Ingredient("Meat", 1)
      ]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id-1];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number,recipe: Recipe){
    this.recipes[index - 1] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index - 1, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
