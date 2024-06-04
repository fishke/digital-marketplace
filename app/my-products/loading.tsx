import Page from "../components/Page";
import { ProductLoadingState } from "../components/ProductsRow";

export default function Loading() {
  return (
    <Page>
      <ProductLoadingState />
      <ProductLoadingState />
      <ProductLoadingState />
    </Page>
  );
}
