import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService {
  ingredientsChanges = new EventEmitter<Ingredient[]>();
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
    this.ingredientsChanges.emit(this.getIngredients());
  }

  getIngredients(){
    return this.ingredients.slice();
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
    this.ingredientsChanges.emit(this.getIngredients());
  }

}
