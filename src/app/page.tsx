import { getPages } from "~/server/queries";
import Landing from "./Landing/page";

const Home = async () => {
  const pagesData = await getPages();
  return <Landing pagesData={pagesData} />;
};

export default Home;
