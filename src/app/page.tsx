import Landing from "./Landing/page";
import { getPages } from "~/server/queries";

type HomeProps = {
  searchParams: { [key: string]: string };
};

const Home = async ({ searchParams }: HomeProps) => {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "5";
  const data = await getPages(page, limit);

  return <Landing pagesData={data} />;
};

export default Home;
