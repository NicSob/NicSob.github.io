import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import './Blog.css'

const blogPosts = [
  {
    slug: 'google-play-protect-thesis',
    title: "Bypassing Google Play Protect",
    date: '2025-07-18',
    excerpt: 'How Google Play Protect\'s dynamic analysis actually vets a new app, measured from inside the app, and how it compares with Google Bouncer in 2012.',
    tags: ['malware-analysis', 'android-security', 'research'],
    readTime: '10 min',
  },
  {
    slug: 'bama-neuralinq',
    title: 'Reverse Engineering the "Neuralinq" Malware',
    date: '2026-06-25',
    excerpt: 'Syscall-level binary patching with HyperDbg, and unpacking a packed ELF by defeating anti-debugging and an auxv genuineness check.',
    tags: ['reverse-engineering', 'malware-analysis', 'ghidra'],
    readTime: '8 min',
  },
  // Add more blog posts here
]

function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="blog" className="blog section">
      <div className="blog-wrapper">
        <div className="blog-divider">
          <div className="divider-line" />
          <span className="divider-text">// BLOG</span>
          <div className="divider-line" />
        </div>

        <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">cat /var/log/blog.log</h2>
          <div className="terminal-output">
            <span className="output-prefix">[{blogPosts.length} ENTRIES FOUND]</span>
          </div>
        </motion.div>

        <motion.div
          className="blog-terminal"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dots">● ○ ○</span>
              <span className="terminal-title">~/blog/</span>
            </div>

            <div className="terminal-body">
              <div className="blog-command">
                <span className="prompt">$</span> ls -la --sort=date
              </div>

              <div className="blog-listing-header">
                <span className="col-perms">-rw-r--r--</span>
                <span className="col-author">msobczyk</span>
                <span className="col-date">Date</span>
                <span className="col-name">Title</span>
              </div>

              <motion.div
                className="blog-posts"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    className="blog-post-item"
                    variants={itemVariants}
                  >
                    <Link to={`/projects/${post.slug}`} className="post-link">
                      <div className="post-listing-row">
                        <span className="col-perms">-rw-r--r--</span>
                        <span className="col-author">msobczyk</span>
                        <span className="col-date">{post.date}</span>
                        <span className="col-name">{post.slug}.md</span>
                      </div>

                      <div className="post-details">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.excerpt}</p>

                        <div className="post-meta">
                          <span className="post-read-time">
                            <span className="meta-icon">⏱</span> {post.readTime}
                          </span>
                          <div className="post-tags">
                            {post.tags.map((tag, idx) => (
                              <span key={idx} className="post-tag">#{tag}</span>
                            ))}
                          </div>
                        </div>

                        <span className="read-indicator">
                          <span className="indicator-text">cat {post.slug}.md</span>
                          <span className="indicator-arrow">→</span>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {blogPosts.length === 0 && (
                <div className="no-posts">
                  <p className="no-posts-text">No blog posts yet.</p>
                  <p className="no-posts-hint"># echo "Coming soon..." &gt;&gt; blog.log</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="blog-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="footer-hint">
            <span className="hint-prompt">#</span> More writeups in progress...
          </p>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Blog
