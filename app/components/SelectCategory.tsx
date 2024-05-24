"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "../lib/categoryItems";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {};

export default function SelectCategory({}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {categoryItems.map((category) => (
        <div key={category.id} className="cursor-pointer">
          <Card
            className={cn(
              "border-2",
              selectedCategory === category.name
                ? "border-primary"
                : "border-primary/10"
            )}
            onClick={() => setSelectedCategory(category.name)}
          >
            <CardHeader>
              {category.image}
              <h3 className="font-medium">{category.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
