interface TagsFilterProps {
  tags: string[];         
  activeTag: string;      
  onTagChange: (tag: string) => void;
}
  

const TagsFilter = ({ tags, activeTag, onTagChange }: TagsFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => onTagChange(tag)}
          className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
            activeTag === tag
              ? "bg-orange-400 text-white border-orange-400 shadow-md scale-105"
              : "bg-white text-gray-600 border-gray-200 hover:border-orange-200 hover:bg-orange-50"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagsFilter;
