"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function searchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <input
      type="text"
      placeholder="Search"
      onChange={handleSearch}
      className="border-2 px-3 p-1 rounded-lg border-gray-200 text-black w-80 text-sm placeholder:text-gray-500"
    />
  );
}
