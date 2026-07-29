const reviews = [
  { title: "Product Manager" },
  { title: "Product Engineer" },
  { title: "Product Designer" },
  { title: "Product Developer" },
  { title: "Product Tester" },
  { title: "Product Manager" },
];

const ReviewCard = ({ title }) => {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shrink-0">
      <div className="flex flex-row items-center gap-2">
        <figcaption className="text-sm font-medium text-white">
          {title}
        </figcaption>
      </div>
    </figure>
  );
};

export default function List() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...reviews, ...reviews].map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </div>
  );
}
