"use client";

import { useTypewriter, Cursor } from "react-simple-typewriter";
import Image from "next/image";
import FadeIn from "@/animations/FadeIn";

const HomePage = () => {
  const [text] = useTypewriter({
    words: [
      "Data & ML Enthusiast",
      "Web Development Enthusiast",
      "UI & UX Designer",
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 1000,
  });

  return (
    <section className="pt-32 pb-20 h-[1000px] md:h-[750px] bg-zinc-100 px-8 dark:bg-zinc-900">
      <div className="md:max-w-7xl mx-auto">
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap-reverse sm:justify-center md:flex-nowrap md:justify-between">
            <div className="mt-20 md:mt-0 self-center px-4 space-y-6 md:w-1/2">
              <p className="text-base font-light">WELCOME TO MY PORTFOLIO</p>
              <h1 className="font-bold text-dark text-4xl mt-1 lg:text-5xl ">
                Hi, Im <span className="text-orange-400">Danendra Dipa</span>
              </h1>
              <h2 className="font-medium text-secondary text-lg mb-5 mt-1 lg:text-2xl">
                {text}
                <Cursor
                  cursorBlinking={false}
                  cursorStyle="|"
                  cursorColor="#FB923C"
                />
              </h2>
              <p className="font-light text-justify leading-relaxed">
                I enjoy working on data-driven projects and creating
                user-friendly websites. Feel free to explore my portfolio or
                reach out if you would like to collaborate!
              </p>
              <a href="#" download={true}>
                <button className="mt-5 text-white text-base font-semibold bg-orange-400 py-3 px-8 rounded-full hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                  Download CV
                </button>
              </a>
            </div>
            <div className="relative w-[400px] h-[400px] overflow-hidden rounded-full shadow-2xl">
              <Image
                src="/dane-hero.JPG"
                alt="Danendra"
                fill // Gunakan 'fill' agar gambar mengisi penuh container
                className="scale-150 object-cover" // Tambahkan kelas kustom
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HomePage;
