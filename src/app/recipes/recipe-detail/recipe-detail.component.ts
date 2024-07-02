import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
  // providers: [RecipeService]
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;
  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],  {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
