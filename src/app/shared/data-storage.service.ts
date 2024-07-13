import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  url: string = 'https://ng-shop-app-71e84-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  saveRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(
      response => {
        console.log(response)
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipes: Recipe[]) => {
        return recipes.map(recipes => {
          return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
