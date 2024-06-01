import Landing from "./Landing/page";
import { getPages } from "./utils/queries";

const Home = async () => {
  const data = await getPages();
  return <Landing pagesData={data} />;
};

export default Home;
