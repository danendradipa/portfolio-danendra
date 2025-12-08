import { skillItem } from "@/constant/data";
import SkillCard from "./SkillCard";
import FadeIn from "@/animations/FadeIn";

const SkillSection = () => {
  return (
    <section className="pt-28 pb-20 bg-zinc-100 dark:bg-zinc-900">
      <FadeIn delay={0.4}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2">
            <p className="text-base font-light text-center">Get to Know</p>
            <h1 className="font-bold text-dark text-2xl text-center text-orange-400">
              Essential Tools I Use
            </h1>
          </div>
          <div className="pt-20 grid gap-3 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {skillItem.map(({ imgSrc, label, desc }, key) => (
              <SkillCard key={key} imgSrc={imgSrc} label={label} desc={desc} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default SkillSection;
