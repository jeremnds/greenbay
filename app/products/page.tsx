import PageContainer from "@/src/components/atoms/PageContainer";
import SearchBar from "@/src/components/molecules/SearchBar";
import ProductList from "@/src/components/organisms/ProductList";

export default function Page() {
  return (
    <PageContainer>
      <SearchBar />
      <ProductList />
    </PageContainer>
  );
}
