import Landing from "./Landing/page";
import { getPages } from "~/server/queries";

const Home = async () => {
  const data = await getPages();
  return <Landing pagesData={data} />;
};

export default Home;
