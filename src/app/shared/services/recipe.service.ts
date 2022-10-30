import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INGREDIENT } from '../Models/ingredient.model';
import { RECIPE } from '../Models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}
  // recipeSelected = new EventEmitter<RECIPE>();
  //replacing this eventemitter with subject, but we do not need it now because we use routnig to render recipes
  // recipeSelected = new Subject<RECIPE>();
  //update recipes array when upadating the recipes in the web page
  recipesChanged = new Subject<RECIPE[]>();
  private recipes: RECIPE[] = [
    {
      name: 'Tasty schnitzel',
      description:
        'Schnitzel is a dish that uses a very thin boneless cutlet from meat such as veal, pork, beef or chicken. The meat can be breaded and then deep fried or it can also be pan fried and then be used as breading or just be consumed without the bread.',
      imagePath: 'https://source.unsplash.com/random/200x200?sig=1',
      ingredients: [
        { name: 'Chicken', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },
    {
      name: 'The ultimate beef burger',
      description:
        'You can enjoy these ultimate beef burgers straight away or make and freeze them for sunny days when you want to fire up the barbecue. Want to try something a little different? How about our lamb burgers with feta and harissa; they’re easy to make and ready in just 30 minutes',
      imagePath: 'https://source.unsplash.com/random/200x200?sig=2',
      ingredients: [
        { name: 'Beef', amount: 1 },
        { name: 'large dill pickle gherkin', amount: 2 },
        { name: 'burger buns', amount: 8 },
      ],
    },
    {
      name: 'NYC-style hot dogs with street-cart onions',
      description:
        'Try these NYC-inspired hot dogs: frankfurters topped with classic caramelised onions, ketchup, American mustard and a little sauerkraut. From summer barbecues through to Bonfire Night, hot dogs will never go out of style. Check out our super sausage recipes and find topping and sauce inspiration, including classic fried onions and next level accompaniments.',
      imagePath: 'https://source.unsplash.com/random/200x200?sig=3',
      ingredients: [
        { name: 'large frankfurters', amount: 4 },
        { name: 'hot dog buns, split', amount: 2 },
        { name: 'large onions, halved and sliced', amount: 2 },
        { name: 'large pinch of chilli powder', amount: 1 },
      ],
    },
    {
      name: 'Air fryer chicken breasts',
      description:
        'Use an air fryer to create this tempting dish of tender chicken breasts coated in garlic, sweet paprika and herbs. Mix up the spices for interest or keep it plain if you prefer',
      imagePath: 'https://source.unsplash.com/random/200x200?sig=4',
      ingredients: [
        { name: 'chicken breasts', amount: 4 },
        { name: '½ tsp garlic granules', amount: 1 },
        { name: 'smoked sweet paprika', amount: 1 },
        { name: 'mixed herbs', amount: 2 },
      ],
    },
  ];

  addIngredientsToShoppingList(ingredients: INGREDIENT[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    // console.log(this.recipes[index]);
    return this.recipes[index];
  }
  addRecipe(recipe: RECIPE) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: RECIPE) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
