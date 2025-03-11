"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCategories } from "@/server/products";
import { useEffect } from "react";
import { Category } from "./shared/types";
import { useCategory } from "@/lib/store";

interface CategorySelectProps {
  initialCategories?: Category[];
}

export default function CategorySelect({
  initialCategories = [],
}: CategorySelectProps) {
  const { categorySelected, categories, setCategories } = useCategory();

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
    } else {
      const fetchCategories = async () => {
        const cats: Category[] = await getCategories();
        setCategories(cats);
      };
      fetchCategories();
    }
  }, [initialCategories, setCategories]);

  const selectedValue = (e: string) => {
    if (e) {
      if (e === "empty") {
        categorySelected("");
      } else categorySelected(e);
    }
  };

  return (
    <Select onValueChange={(e) => selectedValue(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="empty">All</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
