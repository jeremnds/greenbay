import PageContainer from "@/src/components/atoms/PageContainer";
import { signInAction } from "@/src/lib/actions";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <PageContainer>
      <div className="h-[calc(100vh-20rem)] flex justify-center items-center flex-col gap-20">
        <h3 className="text-3xl">Hey, let&apos;s sign in 👋</h3>
        <form action={signInAction}>
          <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
            <Image
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              height="24"
              width="24"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
