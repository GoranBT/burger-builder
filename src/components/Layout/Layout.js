import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'


class Layout extends Component {
  state = {
    showSideDrawer: true
  }


sideDrawerClosedHandler = () => {
  this.setState({ showSideDrawer: false }, () => console.log('handler drawer', this.state));
}

sideDrawerToggleHandler = () => {
  this.setState((prevState) => {
  return {showSideDrawer: !this.state.showSideDrawer};
});
}

  render (){
    console.log(this.state)
    return(
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer
           open={this.state.showSideDrawer}
           closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )

  }
}

export default Layout;
