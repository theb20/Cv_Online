import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { blogPosts, blogAuthor, getPostBySlug } from "../data/blog";
import SEO from "../components/SEO";
import BlogPostCover from "../components/BlogPostCover";

export default function BlogPostDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="text-xl font-bold text-gray-900">Article introuvable</p>
        <Link to="/blog" className="text-sm font-semibold text-[#E85D04] hover:underline">← Retour au blog</Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-white text-neutral-900 min-h-screen font-sans">
      <SEO
        title={post.title}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        type="article"
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden pt-16">
        <BlogPostCover category={post.category} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        <div className="relative flex flex-col justify-end h-full px-6 md:px-10 pb-10 md:pb-14 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#ff8a4c] mb-3"
          >
            {post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-4"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img src={blogAuthor.avatar} alt={blogAuthor.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm text-white/70">{blogAuthor.name} • {post.dateFormatted}</span>
          </motion.div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="max-w-[740px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <button
          onClick={() => navigate("/blog")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 hover:text-black transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Retour au blog
        </button>

        {post.content.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="text-[1.05rem] text-neutral-700 leading-relaxed mb-6 last:mb-0"
          >
            {p}
          </motion.p>
        ))}
      </section>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-black/5">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
            <h2 className="text-lg font-bold text-neutral-900 mb-8">À lire aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group block">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                    <BlogPostCover category={r.category} className="w-full h-full" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E85D04]">{r.category}</span>
                  <h3 className="mt-1.5 font-bold text-neutral-900 text-sm leading-snug group-hover:text-[#E85D04] transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}
