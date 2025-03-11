"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Paginator() {
  const [currentPage, setCurrentPage] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (currentPage) {
      params.set("skip", currentPage.toString());
    } else {
      params.delete("skip");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentPage]);

  const totalProducts = 80;
  const totalPages = Math.ceil(totalProducts / 8);
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 0 && (
          <PaginationItem>
            <PaginationPrevious className="text-lg" onClick={goBack} />
          </PaginationItem>
        )}
        {Array.from(
          { length: Math.min(totalPages - currentPage, 3) },
          (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className="text-lg"
                onClick={() => setCurrentPage(currentPage + index)}
              >
                {currentPage + index + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {totalPages - 3 > currentPage && (
          <PaginationItem>
            <PaginationEllipsis className="text-lg" />
          </PaginationItem>
        )}
        {totalPages == currentPage + 1 ? null : (
          <PaginationItem>
            <PaginationNext className="text-lg" onClick={goForward} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
