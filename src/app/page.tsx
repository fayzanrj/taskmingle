import displayImg from "@/assets/displayImg.png";
import Navbar from "@/components/landingPage/Navbar";
import { Cinzel } from "next/font/google";
import Image from "next/image";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="BG_IMAGE">
      {/* NAVBAR */}
      <Navbar />

      <div className="w-full min-h-screen h-fit flex justify-center lg:justify-between items-center flex-wrap py-20 px-5 lg:px-15">
        {/* SECTION 1 */}
        <section className="w-[28rem] p-10">
          <h1 className={`${cinzel.className} font-bold text-6xl`}>
            Manage Your{" "}
            <span className="text-[#19fa9a] drop-shadow-2xl -z-10">tasks</span> daily
          </h1>

          <p className="my-5 text-sm text-stone-700">
            Start enjoying a more organized work in life to increase your productivity
          </p>

          <button className="bg-gradient-to-br from-[#19fa9a] to-[#22C1C3] text-white py-2 px-6 mt-2 rounded-lg float-right font-semibold">
            Get Started
          </button>
        </section>

        {/* SECTION 2 */}
        <section>
          <Image src={displayImg} width={450} height={450} quality={100} alt="img" />
        </section>
      </div>
    </main>
  );
}