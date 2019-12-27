import React from "react";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component.jsx";

/**
 * For exact matches on the 'shop' path, navigate to the 'CollectionsOverview' compnent,
 * which is a summary view of all collections in the shop.
 * 
 * Otherwise, navigate to a shop page for the collection
 *
 * @param {*} param0 
 */
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
