import React from "react";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component.jsx";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { connect } from "react-redux";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

/**
 * For exact matches on the 'shop' path, navigate to the 'CollectionsOverview' compnent,
 * which is a summary view of all collections in the shop.
 *
 * Otherwise, navigate to a shop page for the collection
 *
 * @param {*} param0
 */
class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromMap = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionsReference = firestore.collection("collections");
    this.unsubscribeFromMap = collectionsReference.onSnapshot(
      async snapShot => {
        const transformedCollections = convertCollectionSnapshotToMap(snapShot);
        updateCollections(transformedCollections);
        this.setState({
          loading: false
        });
      }
    );
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
