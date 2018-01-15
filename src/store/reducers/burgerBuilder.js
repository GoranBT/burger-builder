import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
      ingredients: updatedIngredients,
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      //   },
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // };
    case actionTypes.REMOVE_INGREDIENT:
    const updatedIngredi = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngredies = updateObject(...state.ingredients, updatedIngredi)
    const updatedStat = {
      ingredients: updatedIngredies,
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStat);
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      //   },
      //   totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      //
      // };
      case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
          },
          error: false,
          totalPrice: 4
        })
      // return {
      //   ...state,
      //   ingredients: action.ingredients,
      //   error: false,
      //   totalPrice: 4
      // };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true } )

      // return {
      //   ...state,
      //   error: true
      // };
    default:
      return state;
    }
};

export default reducer;
