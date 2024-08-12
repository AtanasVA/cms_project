import Header from "../_components/Header/page";
import { SinglePageData } from "shared/PagesDataContext";
import RenderPageFields from "./PagePosts";
import { getPage } from "~/server/queries";

type CustomPageType = {
  params: { slug: string };
};

export type SinglePageDataWithPostsType = SinglePageData & {
  posts: { id: number; postContent?: string; parentSlug: string }[];
};

const CustomPage = async ({ params }: CustomPageType) => {
  const { data: pageData } = await getPage(
    params.slug,
    true //TODO: Find another way to get posts
  );

  return (
    <>
      <Header />
      <div className="text-center mt4 col-md-6 mx-auto">
        <h1 className="text-danger">{`${pageData[0].metaTitle}`}</h1>
        <p>{pageData[0].metaDescription}</p>
        <div className="border border-danger"></div>
        <RenderPageFields
          parentSlug={pageData[0].slug || ""}
          pagePosts={pageData[0].posts}
        />
      </div>
    </>
  );
};

export default CustomPage;
