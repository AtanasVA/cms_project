import { Dispatch, SetStateAction, createContext } from "react";

export type SinglePageData = {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription?: string;
};

export type CreatedPagesDataContextType = {
  createdPagesCtxData: SinglePageData[];
  setCreatedPagesCtxData: Dispatch<SetStateAction<SinglePageData[]>>;
};

const INIT_CONTEXT = {
  createdPagesCtxData: [],
  setCreatedPagesCtxData: () => {},
};

//The context keeps an object containing the state Variable
//and the setState function for the created pages data
export const CreatedPagesDataContext =
  createContext<CreatedPagesDataContextType>(INIT_CONTEXT);
