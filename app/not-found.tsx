import { buttonVariants } from "@/src/components/atoms/Button";
import PageContainer from "@/src/components/atoms/PageContainer";
import Link from "next/link";

function NotFound() {
  return (
    <PageContainer className=" space-y-6 mt-4 flex items-center flex-col justify-center h-96">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link href="/" className={buttonVariants()}>
        Go back home
      </Link>
    </PageContainer>
  );
}

export default NotFound;
