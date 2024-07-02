import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  id: number;
  editMode = false;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initFrom();
      })
  }

  private initFrom() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.get['name'],
    //   this.recipeForm.get['description'],
    //   this.recipeForm.get['imagePath'],
    //   this.recipeForm.get['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    console.log(this.route.snapshot.params["id"]);
    this.router.navigate(['recipes',
      this.route.snapshot.params["id"] == null ?
        this.recipeService.getRecipes().length :
        this.route.snapshot.params["id"]]);
  }

  onCancel() {
    // this.router.navigate(['recipes',
    //   this.route.snapshot.params["id"] == null ?
    //     "" :
    //     this.route.snapshot.params["id"]]);
    this.router.navigate(["../"], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
