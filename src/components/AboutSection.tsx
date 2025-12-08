import FadeIn from "@/animations/FadeIn";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="pt-18 px-8 bg-zinc-100 dark:bg-zinc-900">
      <FadeIn delay={0.3}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2">
            <p className="text-base font-light text-center">Get to Know</p>
            <h1 className="font-bold text-dark text-2xl text-center text-orange-400">
              About Me
            </h1>
          </div>

          <div className="flex flex-wrap justify-center md:flex-nowrap pt-20 gap-16 md:justify-evenly">
            <div className="rotate-12 transition-transform duration-500 hover:rotate-0">
              <Image
                src="/dane-about.jpg"
                alt="Danendra"
                width={350}
                height={350}
                className="rounded-3xl"
              />
            </div>
            <div className="mt-12 md:mt-0 md:w-1/2 md:max-w-[500px] flex flex-col gap-6">
              <p className="font-light text-lg text-justify leading-relaxed">
                Hi everyone, my name is Danendra Dipa. I am a student of
                Information Technology at Yogyakarta State University with a
                passion for technology, focusing on Machine Learning, Front-End
                Web Development, and UI/UX Design. I have experience using
                Python and JavaScript for development and enjoy creating user
                interfaces with frameworks like React.
              </p>
              <p className="font-light text-lg text-justify leading-relaxed">
                I also have a background in designing user-friendly and visually
                appealing interfaces with tools like Figma. I am eager to
                explore new technologies and apply them to solve real-world
                problems effectively.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default AboutSection;
