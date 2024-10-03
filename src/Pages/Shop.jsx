import React, { Suspense } from "react";
import { Hero } from "../Component/Hero/Hero";
// import { Popular } from "../Component/Popular/Popular";
// import { Offers } from "../Component/Offers/Offers";
// import { NewCollections } from "../Component/NewCollections/NewCollections";
const Popular = React.lazy(() => import("../Component/Popular/Popular"));
const Offers = React.lazy(() => import("../Component/Offers/Offers"));
const NewCollections = React.lazy(() =>
  import("../Component/NewCollections/NewCollections")
);
const NewsLetter = React.lazy(() =>
  import("../Component/NewsLetter/NewsLetter")
);

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<div> Loading... </div>}>
        <Popular />
        <Offers />
        <NewCollections />
        <NewsLetter />
      </Suspense>
    </div>
  );
};
