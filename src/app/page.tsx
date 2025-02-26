import { SvgIconAmalgamaLogo } from "@/components/ui/icons";

export default async function HomePage() {
  return (
    <main className="flex flex-col justify-end items-center mx-auto h-[50vh]">
      <SvgIconAmalgamaLogo className="w-80 md:w-96" />
    </main>
  );
}
