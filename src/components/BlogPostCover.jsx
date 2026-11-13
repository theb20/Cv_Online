import {
  Code2, Server, Gauge, Briefcase, Workflow, ShieldCheck, ClipboardList, TrendingUp,
} from "lucide-react";
import { CATEGORY_STYLE } from "../data/blog";

const CATEGORY_ICON = {
  Frontend: Code2,
  Backend: Server,
  Performance: Gauge,
  Freelance: Briefcase,
  Automatisation: Workflow,
  "Sécurité": ShieldCheck,
  "Méthodologie": ClipboardList,
  SEO: TrendingUp,
};

const BlogPostCover = ({ category, className = "" }) => {
  const color = CATEGORY_STYLE[category] || "#6b7280";
  const Icon = CATEGORY_ICON[category] || Code2;

  return (
    <div
      className={`overflow-hidden flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(155deg, ${color}, #0a0a0a)` }}
    >
      <Icon className="w-1/2 h-1/2 transition-transform duration-500 group-hover:scale-110" style={{ color: "rgba(255,255,255,.14)" }} strokeWidth={1.2} />
    </div>
  );
};

export default BlogPostCover;
