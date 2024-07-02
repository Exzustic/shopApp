import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanges = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples",5),
    new Ingredient("Tomatoes",10)
  ];

  addIngredients(ingredients: Ingredient[]) {
    //this.ingredients.push(...ingredients); - можно так пушить массив елементов
    let is = true;
    for (let i = 0; i < ingredients.length; i++) {
      is = true;
      for (let j = 0; j < this.ingredients.length; j++){
        if(ingredients[i].name == this.ingredients[j].name){
          this.ingredients[j].amount += ingredients[i].amount;
          is = false;
        }
      }
      if (is){
        this.ingredients.push(ingredients[i]);
      }
    }
    this.ingredientsChanges.next(this.getIngredients());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  onAddIngredient(ingredient: Ingredient) {
    let is = true;
    for(let i of this.ingredients){
      if (i.name == ingredient.name){
        i.amount = i.amount + Number(ingredient.amount);
        is = false;
        break;
      }
    }
    if(is)
      this.ingredients.push(ingredient);
    this.ingredientsChanges.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanges.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanges.next(this.ingredients.slice())
  }

}
