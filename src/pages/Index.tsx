import { motion } from "framer-motion";
import { ArrowRight, Calculator, Globe, TrendingUp, Sparkles, Zap, BarChart3, CheckCircle2, Star, Users, Shield, Award, ChevronRight, MessageSquare } from "lucide-react";
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
    icon: <Calculator className="w-7 h-7" />,
    href: "/calculator",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "hover:border-primary/40",
    iconColor: "text-primary",
    stats: "2,340+ businesses matched",
  },
  {
    title: "Website URL Analyzer",
    description: "Enter any URL for an instant 47-point audit. Uncover speed issues, SEO gaps, conversion leaks, and estimated revenue loss.",
    icon: <Globe className="w-7 h-7" />,
    href: "/analyzer",
    gradient: "from-destructive/20 to-destructive/5",
    borderColor: "hover:border-destructive/40",
    iconColor: "text-destructive",
    stats: "500+ sites audited this month",
  },
  {
    title: "Growth Simulator",
    description: "Plug in your real metrics and see how a small conversion rate increase translates into massive annual revenue growth.",
    icon: <TrendingUp className="w-7 h-7" />,
    href: "/simulator",
    gradient: "from-accent/20 to-accent/5",
    borderColor: "hover:border-accent/40",
    iconColor: "text-accent",
    stats: "$4.2M+ growth projected",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO, Luxe Interiors",
    text: "The Website Calculator saved us months of research. We knew exactly what to build and what to budget for. The ROI projection was spot-on.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Marketing Director, TechFlow",
    text: "The URL Analyzer revealed we were losing $8K/month to conversion leaks we didn't even know existed. Game-changer.",
    stars: 5,
  },
  {
    name: "Elena Rossi",
    role: "Founder, GreenScale SaaS",
    text: "The Growth Simulator showed us that a 1.5% conversion increase meant $240K more per year. We booked a strategy call immediately.",
    stars: 5,
  },
];

const logos = ["Shopify", "HubSpot", "Stripe", "Notion", "Slack", "Vercel"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-display text-gradient-primary">GrowthLab</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Calculator</Link>
            <Link to="/analyzer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analyzer</Link>
            <Link to="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulator</Link>
          </div>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            <Link to="/calculator">Get Started</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="max-w-5xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" /> Free Growth Tools — No Signup Required
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-5 leading-[1.1]">
              Stop Guessing.<br />
              <span className="text-gradient-primary">Start Growing.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Three powerful diagnostic tools that reveal exactly what your website needs, where you're losing money, and how to scale revenue — in under 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8 h-13">
                <Link to="/calculator">Start Free Analysis <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2 text-base px-8 h-13">
                <Link to="/analyzer">Audit My Website <Globe className="w-4 h-4" /></Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> 100% Free</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No signup needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Instant results</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by businesses using</p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {logos.map((logo) => (
              <span key={logo} className="text-muted-foreground/40 font-display font-bold text-lg">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">Our Tools</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mt-2 mb-3">Three Tools. One Growth Strategy.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Each tool is designed to give you actionable intelligence — not generic advice.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div key={tool.href} {...fadeUp} transition={{ delay: 0.1 * i }}>
              <Link
                to={tool.href}
                className={`group block h-full bg-gradient-to-b ${tool.gradient} border-2 border-border ${tool.borderColor} rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className={`w-14 h-14 rounded-xl bg-card flex items-center justify-center mb-5 ${tool.iconColor}`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                <p className="text-xs text-primary/80 font-medium mb-4">{tool.stats}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Try It Now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-2 mb-3">From Diagnosis to Growth in 3 Steps</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Diagnose", desc: "Use the Calculator or Analyzer to assess your current website's strengths and weaknesses.", icon: <Zap className="w-6 h-6" /> },
              { step: "02", title: "Quantify", desc: "The Growth Simulator shows you exactly how much revenue you're leaving on the table.", icon: <BarChart3 className="w-6 h-6" /> },
              { step: "03", title: "Execute", desc: "Get your personalized strategy report and book a call to start scaling.", icon: <TrendingUp className="w-6 h-6" /> },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  {item.icon}
                </div>
                <span className="text-xs text-primary font-bold tracking-wider">{item.step}</span>
                <h3 className="text-lg font-bold font-display mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Websites Analyzed" },
              { value: "3.2x", label: "Average ROI Achieved" },
              { value: "87%", label: "Report Revenue Growth" },
              { value: "$4.2M", label: "Revenue Growth Projected" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold font-display text-gradient-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-2 mb-3">What Our Users Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}
                className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-2 mb-3">Built Different from Generic Tools</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "Data-Driven Recommendations", desc: "Every suggestion is backed by analysis of 500+ business websites across 12 industries." },
              { icon: <Award className="w-5 h-5" />, title: "Personalized, Not Generic", desc: "Results are tailored to your industry, budget, goals, and current situation." },
              { icon: <Users className="w-5 h-5" />, title: "Revenue-First Thinking", desc: "We don't sell websites. We sell revenue growth. Every metric ties back to your bottom line." },
              { icon: <MessageSquare className="w-5 h-5" />, title: "Actionable Strategy Reports", desc: "Not just scores — you get a full strategy report with tech stack, investment range, and ROI projections." },
            ].map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}
                className="flex gap-4 bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">{f.icon}</div>
                <div>
                  <h3 className="font-bold font-display mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp}
            className="text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">Ready to Unlock Your Growth?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Pick any tool below and get actionable insights in under 3 minutes. No signup, no credit card, no strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary">
                <Link to="/calculator">Website Calculator <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2">
                <Link to="/analyzer">URL Analyzer <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold gap-2">
                <Link to="/simulator">Growth Simulator <ChevronRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold font-display text-gradient-primary">GrowthLab</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/calculator" className="hover:text-foreground transition-colors">Calculator</Link>
            <Link to="/analyzer" className="hover:text-foreground transition-colors">Analyzer</Link>
            <Link to="/simulator" className="hover:text-foreground transition-colors">Simulator</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 GrowthLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
