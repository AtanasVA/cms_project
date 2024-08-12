"use client";
import {
  CreatedPagesDataContext,
  type SinglePageData,
} from "shared/PagesDataContext";
import CreatedPagesGrid from "../_components/CreatedPagesGrid/page";
import Header from "../_components/Header/page";
import { useEffect, useState } from "react";

type LandingProps = {
  pagesData: {
    paginationArgs?: {
      page: string;
      limit: string;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      totalCount: number;
    };
    data?: [];
  };
};

const Landing = ({ pagesData }: LandingProps) => {
  const [createdPagesCtxData, setCreatedPagesCtxData] = useState<
    SinglePageData[]
  >(pagesData?.data || []);

  useEffect(() => {
    setCreatedPagesCtxData(pagesData?.data || []);
  }, [pagesData?.data]);

  return (
    <CreatedPagesDataContext.Provider
      value={{ createdPagesCtxData, setCreatedPagesCtxData }}
    >
      <Header />
      <div className="text-center mt4 col-md-8 mx-auto min-h-lvh">
        <h1 className="text-danger">Created Pages</h1>
        <div className="border border-danger"></div>
        <CreatedPagesGrid paginationArgs={pagesData?.paginationArgs} />
      </div>
    </CreatedPagesDataContext.Provider>
  );
};

export default Landing;
