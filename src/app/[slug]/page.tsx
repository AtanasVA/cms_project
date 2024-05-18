"use client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";

type ParamsType = Params & {
  slug: number;
};

const CustomPage = () => {
  const params: ParamsType = useParams();

  return (
    <div className="text-center mt4 col-md-6 mx-auto">
      <h1 className="text-danger">{`I'm a custom page with ID: ${params.slug}`}</h1>
    </div>
  );
};

export default CustomPage;
