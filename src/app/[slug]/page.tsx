"use client";
import { type Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import Header from "../_components/Header/page";
import { getPage } from "~/server/queries";
import { SinglePageData } from "shared/PagesDataContext";

type ParamsType = Params & {
  slug: string;
};

const CustomPage = async () => {
  const params: ParamsType = useParams();
  const [pageData]: SinglePageData[] = await getPage(params.slug);

  //TODO: Move data fetching to server

  //Use the slug to fetch the data for the specific page from the DB
  //also for the title show the Title of the page itself and not the slug as it's currently set
  return (
    <>
      <Header />
      <div className="text-center mt4 col-md-6 mx-auto">
        <h1 className="text-danger">{`${pageData?.metaTitle}`}</h1>
        <p>{pageData?.metaDescription}</p>
        <div className="border border-danger"></div>
      </div>
    </>
  );
};

export default CustomPage;
