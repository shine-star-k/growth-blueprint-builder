import { motion } from "framer-motion";
import { ArrowRight, Calculator, Globe, TrendingUp, Zap, BarChart3, CheckCircle2, Star, Users, Shield, Award, ChevronRight, MessageSquare, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const tools = [
  {
    title: "Smart Website Calculator",
    description: "Answer 5 quick questions and discover the exact website type, tech stack, and investment range your business needs.",
    icon: <Calculator className="w-6 h-6" />,
    href: "/calculator",
    stats: "2,340+ businesses matched",
  },
  {
    title: "Website URL Analyzer",
    description: "Enter any URL for an instant 47-point audit. Uncover speed issues, SEO gaps, conversion leaks, and estimated revenue loss.",
    icon: <Globe className="w-6 h-6" />,
    href: "/analyzer",
    stats: "500+ sites audited this month",
  },
  {
    title: "Growth Simulator",
    description: "Plug in your real metrics and see how a small conversion rate increase translates into massive annual revenue growth.",
    icon: <TrendingUp className="w-6 h-6" />,
    href: "/simulator",
    stats: "$4.2M+ growth projected",
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "CEO, Luxe Interiors", text: "The Website Calculator saved us months of research. We knew exactly what to build and what to budget for. The ROI projection was spot-on.", stars: 5 },
  { name: "Marcus Webb", role: "Marketing Director, TechFlow", text: "The URL Analyzer revealed we were losing $8K/month to conversion leaks we didn't even know existed. Game-changer.", stars: 5 },
  { name: "Elena Rossi", role: "Founder, GreenScale SaaS", text: "The Growth Simulator showed us that a 1.5% conversion increase meant $240K more per year. We booked a strategy call immediately.", stars: 5 },
];

const logos = ["Shopify", "HubSpot", "Stripe", "Notion", "Slack", "Vercel"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-display text-gradient-primary tracking-tight">GrowthLab</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Calculator</Link>
            <Link to="/analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Analyzer</Link>
            <Link to="/simulator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Simulator</Link>
          </div>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/80 font-semibold rounded-sm">
            <Link to="/calculator">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-24">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-widest mb-8 border border-primary/20">
              <Zap className="w-3.5 h-3.5" /> Free Growth Tools
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6 leading-[0.95] tracking-tight">
              Stop Guessing.<br />
              <span className="text-gradient-primary">Start Growing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Three powerful diagnostic tools that reveal exactly what your website needs, where you're losing money, and how to scale revenue — in under 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 font-bold gap-2 text-base px-8 h-14 rounded-sm">
                <Link to="/calculator">Start Free Analysis <ArrowRight className="w-5 h-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2 text-base px-8 h-14 rounded-sm border-border hover:border-primary/40 hover:text-primary">
                <Link to="/analyzer">Audit My Website <Globe className="w-5 h-5" /></Link>
              </Button>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> 100% Free</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> No signup needed</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Instant results</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-[0.2em] mb-6">Trusted by businesses using</p>
          <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
            {logos.map((logo) => (
              <span key={logo} className="text-muted-foreground/30 font-display font-bold text-lg tracking-wide">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <motion.div {...fadeUp} className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 mb-4 tracking-tight">Three Tools.<br />One Growth Strategy.</h2>
          <p className="text-muted-foreground max-w-xl text-lg">Each tool is designed to give you actionable intelligence — not generic advice.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.div key={tool.href} {...fadeUp} transition={{ delay: 0.1 * i }}>
              <Link
                to={tool.href}
                className="group block h-full bg-card border border-border rounded-lg p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(75_100%_50%/0.15)]"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3 tracking-tight">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{tool.description}</p>
                <p className="text-xs text-primary/70 font-medium mb-5">{tool.stats}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  Try It Now <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 bg-card/60 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 tracking-tight">From Diagnosis to<br />Growth in 3 Steps</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Diagnose", desc: "Use the Calculator or Analyzer to assess your current website's strengths and weaknesses.", icon: <Zap className="w-6 h-6" /> },
              { step: "02", title: "Quantify", desc: "The Growth Simulator shows you exactly how much revenue you're leaving on the table.", icon: <BarChart3 className="w-6 h-6" /> },
              { step: "03", title: "Execute", desc: "Get your personalized strategy report and book a call to start scaling.", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="relative">
                <span className="text-7xl font-bold font-display text-primary/10 absolute -top-4 -left-2">{item.step}</span>
                <div className="relative pt-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">{item.icon}</div>
                  <h3 className="text-xl font-bold font-display mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Websites Analyzed" },
              { value: "3.2x", label: "Average ROI Achieved" },
              { value: "87%", label: "Report Revenue Growth" },
              { value: "$4.2M", label: "Revenue Growth Projected" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-4xl md:text-5xl font-bold font-display text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-card/60 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 tracking-tight">What Our Users Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}
                className="bg-background border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mt-3 tracking-tight">Built Different from<br />Generic Tools</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Data-Driven Recommendations", desc: "Every suggestion is backed by analysis of 500+ business websites across 12 industries." },
              { icon: <Award className="w-5 h-5" />, title: "Personalized, Not Generic", desc: "Results are tailored to your industry, budget, goals, and current situation." },
              { icon: <Users className="w-5 h-5" />, title: "Revenue-First Thinking", desc: "We don't sell websites. We sell revenue growth. Every metric ties back to your bottom line." },
              { icon: <MessageSquare className="w-5 h-5" />, title: "Actionable Strategy Reports", desc: "Not just scores — you get a full strategy report with tech stack, investment range, and ROI projections." },
            ].map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}
                className="flex gap-5 bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">{f.icon}</div>
                <div>
                  <h3 className="font-bold font-display mb-1 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovate. Inspire. Create. - Katalyst style large text */}
      <section className="py-24 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-6 md:gap-12 text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight">
              <span className="text-foreground">Analyze.</span>
              <span className="text-primary">Optimize.</span>
              <span className="text-foreground">Grow.</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp}
            className="text-center bg-card border border-border rounded-lg p-14">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 tracking-tight">Ready to Unlock<br />Your Growth?</h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-lg">
              Pick any tool below and get actionable insights in under 3 minutes. No signup, no credit card.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 font-bold gap-2 rounded-sm h-13">
                <Link to="/calculator">Website Calculator <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2 rounded-sm h-13 hover:border-primary/40 hover:text-primary">
                <Link to="/analyzer">URL Analyzer <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2 rounded-sm h-13 hover:border-primary/40 hover:text-primary">
                <Link to="/simulator">Growth Simulator <ChevronRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold font-display text-gradient-primary tracking-tight">GrowthLab</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/calculator" className="hover:text-primary transition-colors">Calculator</Link>
            <Link to="/analyzer" className="hover:text-primary transition-colors">Analyzer</Link>
            <Link to="/simulator" className="hover:text-primary transition-colors">Simulator</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 GrowthLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
