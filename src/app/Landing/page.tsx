"use client";
import {
  CreatedPagesDataContext,
  type SinglePageData,
} from "shared/PagesDataContext";
import CreatedPagesGrid from "../_components/CreatedPagesGrid/page";
import Header from "../_components/Header/page";
import { useState } from "react";

type LandingProps = {
  pagesData: [];
};

const Landing = ({ pagesData }: LandingProps) => {
  const [createdPagesCtxData, setCreatedPagesCtxData] = useState<
    SinglePageData[]
  >(pagesData || []);

  return (
    <CreatedPagesDataContext.Provider
      value={{ createdPagesCtxData, setCreatedPagesCtxData }}
    >
      <Header />
      <div className="text-center mt4 col-md-8 mx-auto">
        <h1 className="text-danger">Created Pages</h1>
        <div className="border border-danger"></div>
        <CreatedPagesGrid />
      </div>
    </CreatedPagesDataContext.Provider>
  );
};

export default Landing;
