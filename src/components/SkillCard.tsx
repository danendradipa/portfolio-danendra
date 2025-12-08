import Image from 'next/image';

interface SkillCardProps {
  imgSrc: string; 
  label: string; 
  desc: string; 
  classes?: string; 
}

const SkillCard: React.FC<SkillCardProps> = ({ imgSrc, label, desc, classes = '' }) => {
  return (
    <div
      className={
        `flex items-center gap-3 ring-2 ring-zinc-400/50 ring-inset dark:ring-zinc-50/10 rounded-2xl p-3 
        hover:bg-zinc-400/30 dark:hover:bg-zinc-800 transition-colors group ` + classes
      }
    >
      <figure className="bg-zinc-300/80 dark:bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-2 group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 transition-colors">
        <Image src={imgSrc} width={32} height={32} alt={label} />
      </figure>

      <div>
        <h3 className="text-zinc-900 dark:text-white font-semibold">{label}</h3>
        <p className="text-zinc-500/70 dark:text-zinc-400 text-sm">{desc}</p>
      </div>
    </div>
  );
};

export default SkillCard;
