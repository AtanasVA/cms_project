import { getPages } from "~/server/queries";
import Landing from "./Landing/page";

const Home = async () => {
  const data = await getPages();
  return <Landing pagesData={data} />;
};

export default Home;
