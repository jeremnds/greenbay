import Image from "next/image";
import MaxWidthWrapper from "../../src/components/ui/MaxWidthWrapper";
import { signInAction } from "../../src/lib/actions";

export default function page() {
  return (
    <MaxWidthWrapper>
      <div className="h-screen flex justify-center items-center flex-col gap-20">
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
    </MaxWidthWrapper>
  );
}
