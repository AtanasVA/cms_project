import Header from "../_components/Header/page";
import { getPage } from "~/server/queries";
import { SinglePageData } from "shared/PagesDataContext";
import RenderPageFields from "./RenderPageFields";

type CustomPageType = {
  params: { slug: string };
};

export type SinglePageDataWithPostsType = SinglePageData & {
  posts: { id: number; postContent?: string; parentSlug: string }[];
};

const CustomPage = async ({ params }: CustomPageType) => {
  const [pageData]: SinglePageDataWithPostsType[] = await getPage(
    params.slug,
    true //TODO: Find another way to get posts
  );

  return (
    <>
      <Header />
      <div className="text-center mt4 col-md-6 mx-auto">
        <h1 className="text-danger">{`${pageData?.metaTitle}`}</h1>
        <p>{pageData?.metaDescription}</p>
        <div className="border border-danger"></div>
        <RenderPageFields
          parentSlug={pageData?.slug || ""}
          pagePosts={pageData?.posts}
        />
      </div>
    </>
  );
};

export default CustomPage;
