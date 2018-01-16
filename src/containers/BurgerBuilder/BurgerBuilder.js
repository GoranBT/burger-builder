import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount () {
    console.log(this.props);
    this.props.onInitIngredients();
    // Used Redux for this
    // axios.get( 'https://my-react-burger-ab717.firebaseio.com/ingredients.json' )
    // .then( response => {
    //   this.setState( { ingredients: response.data } );
    // } )
    // .catch( error => {
    //   this.setState( { error: true } );
    // } );
  }

  updatePurchaseState ( ingredients ) {
    const sum = Object.keys( ingredients )
    .map( igKey => {
      return ingredients[igKey];
    } )
    .reduce( ( sum, el ) => {
      return sum + el;
    }, 0 );
    // this.setState( { purchasable: sum > 0 } );
    return sum > 0;
  }


  // managing this with redux

  // addIngredientHandler = ( type ) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
  //   this.updatePurchaseState( updatedIngredients );
  // }
  //
  // removeIngredientHandler = ( type ) => {
  //   const oldCount = this.state.ingredients[type];
  //   if ( oldCount <= 0 ) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
  //   this.updatePurchaseState( updatedIngredients );
  // }

  purchaseHandler = () => {
    if(this.props.isAuthenticated) {
      this.setState( { purchasing: true } );
    } else {
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurcase();
    // alert('You continue!');
    // this is managed using redux
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryString
    });
  }

  render () {
    const disabledInfo = {
      ...this.props.ing
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if ( this.props.ing ) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
          </Aux>
        );
        orderSummary = <OrderSummary
          ingredients={this.props.ing}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
          orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
          <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
          </Aux>
        );
      }
    }

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // redux advance
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurcase: () => dispatch(actions.purchaseInit())
    // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}



    export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
