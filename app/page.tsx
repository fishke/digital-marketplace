import { ProductsRow } from "./components/ProductsRow";
import Page from "./components/Page";

export default function Home() {
  return (
    <Page className="mb-24">
      <div className="max-w-3xl mx-auto text-2xl font-semibold text-center sm:text-5xl lg:text-6xl">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="text-balance font-normal lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] text-base">
          TomerUI stands out as the premier marketplace for all things related
          to tailwind. We offer a wide range of templates, icons, and other
          resources to help you build your next project.
        </p>
      </div>
      <ProductsRow title="Templates" category="template" />
      <ProductsRow title="UI Kits" category="uikit" />
      <ProductsRow title="Icons" category="icon" />
    </Page>
  );
}
