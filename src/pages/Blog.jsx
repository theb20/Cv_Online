import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { blogPosts, blogAuthor } from "../data/blog";
import { profile } from "../data/profile";
import SEO from "../components/SEO";
import BlogPostCover from "../components/BlogPostCover";
import { ArrowUpRight, ArrowRight, Linkedin } from "lucide-react";

const INITIAL_VISIBLE = 9;

const Blog = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const rest = blogPosts.filter((p) => p.id !== featured.id);
  const visible = rest.slice(0, visibleCount);

  return (
    <>
      <SEO
        title="Blog | Frédérick Ahobaut"
        description="Notes et retours d'expérience sur le développement web, le freelance et les projets clients."
      />

      <div className="bg-white text-neutral-900 min-h-screen font-sans">

        {/* ══════════════════════════════════════════
            FEATURED
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-10 pt-28 md:pt-32 pb-16 md:pb-20">
          <Link
            to={`/blog/${featured.slug}`}
            className="group relative block w-full rounded-3xl overflow-hidden"
            style={{ minHeight: 720 }}
          >
            <BlogPostCover category={featured.category} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            <span className="absolute top-6 right-6 md:top-10 md:right-10 w-11 h-11 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-5 h-5 text-black" />
            </span>

            <div className="relative flex flex-col justify-end h-full min-h-[420px] p-6 md:p-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 mb-3">Featured</span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl mb-3">
                {featured.title}
              </h1>
              <p className="text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        </section>

        {/* ══════════════════════════════════════════
            RECENT POSTS
        ══════════════════════════════════════════ */}
        <section className=" px-6 md:px-10 pb-20 md:pb-28">
          <h2 className="text-lg font-bold text-neutral-900 mb-8">Articles récents</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {visible.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 9) * 0.05 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                    <BlogPostCover category={post.category} className="w-full h-full" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E85D04]">
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 font-bold text-neutral-900 text-base leading-snug mb-1.5 group-hover:text-[#E85D04] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src={blogAuthor.avatar}
                      alt={blogAuthor.name}
                      className="w-6 h-6 rounded-full object-cover shrink-0"
                    />
                    <span className="text-xs text-neutral-500">
                      {blogAuthor.name} • {post.dateFormatted}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {visibleCount < rest.length && (
            <div className="flex justify-center mt-14">
              <button
                onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                className="px-5 py-2.5 text-sm font-semibold text-neutral-700 border border-neutral-200 rounded-full hover:border-neutral-400 hover:text-black transition-colors"
              >
                Charger plus…
              </button>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════
            CTA
        ══════════════════════════════════════════ */}
        <section className="bg-[#0a0a0a] py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Un projet en tête ?<br />Parlons-en.
              </h2>
              <p className="text-neutral-400 max-w-md mx-auto mb-10 text-sm">
                {profile.availability}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#E85D04] hover:bg-orange-600 text-white font-bold rounded-2xl transition-all text-sm">
                  {profile.email} <ArrowRight className="w-4 h-4" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Blog;
