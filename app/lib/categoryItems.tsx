import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface ICategory {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: ICategory[] = [
  {
    id: 1,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 2,
    name: "uikit",
    title: "UI Kit",
    image: <ChefHat />,
  },
  {
    id: 3,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
];
