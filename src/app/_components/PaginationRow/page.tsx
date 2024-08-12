"use client";
import { useRouter } from "next/navigation";
import Pagination from "react-bootstrap/Pagination";

type PaginationRowProps = {
  paginationArgs: {
    page: string;
    limit: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalCount: number;
  };
};

const PaginationRow = ({ paginationArgs }: PaginationRowProps) => {
  const { page, hasNextPage, hasPrevPage, totalCount } = paginationArgs;
  const router = useRouter();

  const handleNextPageClick = () => {
    router.push(`?page=${Number(page) + 1}`);
  };
  const handlePrevPageClick = () => {
    router.push(`?page=${Number(page) - 1}`);
  };

  return (
    <>
      <div>{`Total pages count: ${totalCount}`}</div>
      <Pagination className="mt-3 d-flex justify-content-center">
        <Pagination.Prev
          onClick={handlePrevPageClick}
          disabled={!hasPrevPage}
        />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPageClick}
          disabled={!hasNextPage}
        />
      </Pagination>
    </>
  );
};

export default PaginationRow;
