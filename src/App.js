import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";

import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfile } from "./firebase/firebase.utils";

class App extends React.Component {
  // create a subscription object to be used when component unmounts
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //set that subscription's value
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userReference = await createUserProfile(userAuth);
        userReference.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // call the subscription object
    this.unsubscribeFromAuth();
  }

  /**
   * Determines which page to redirect sign-in render invocations.
   *
   * This will redirect users to the home page after signing in, and also prevent them
   * from accessing the page once signed in.
   */
  signInRedirect = () => {
    if (this.props.currentUser) return <Redirect to="/" />;
    return <SignInAndSignUpPage />;
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route exact path="/checkout" component={CheckoutPage}></Route>
          <Route exact path="/sign-in" render={this.signInRedirect}></Route>
        </Switch>
      </div>
    );
  }
}

/**
 * function that defines where to retrieve current user from redux
 */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
