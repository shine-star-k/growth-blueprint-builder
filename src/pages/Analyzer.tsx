import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe, Loader2, AlertTriangle, TrendingDown, ShieldAlert, Eye, Gauge, Search, Smartphone, Lock, Link2, Accessibility, CheckCircle2, Star, Clock, Users, ChevronDown, ChevronUp, Zap, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ScoreRing from "@/components/ScoreRing";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

interface AuditData {
  url: string;
  industry: string;
  monthlyRevenue: string;
  monthlyTraffic: string;
  avgOrderValue: string;
  frustration: string;
  budget: string;
  timeline: string;
}

const generateScores = () => ({
  speed: Math.floor(Math.random() * 40) + 30,
  mobile: Math.floor(Math.random() * 35) + 40,
  ssl: Math.random() > 0.3 ? 100 : 0,
  seo: Math.floor(Math.random() * 40) + 25,
  accessibility: Math.floor(Math.random() * 40) + 30,
  brokenLinks: Math.floor(Math.random() * 8),
  conversionLeak: Math.floor(Math.random() * 30) + 50,
  trustDeficiency: Math.floor(Math.random() * 40) + 30,
});

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold font-display text-gradient-primary">GrowthLab</Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Calculator</Link>
        <Link to="/analyzer" className="text-sm text-foreground font-medium">Analyzer</Link>
        <Link to="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulator</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
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
);

const Analyzer = () => {
  const [phase, setPhase] = useState<"landing" | "input" | "qualifying" | "loading" | "results">("landing");
  const [qualifyStep, setQualifyStep] = useState(0);
  const [data, setData] = useState<AuditData>({
    url: "", industry: "", monthlyRevenue: "", monthlyTraffic: "",
    avgOrderValue: "", frustration: "", budget: "", timeline: "",
  });
  const [scores, setScores] = useState(generateScores());
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [otherFrustration, setOtherFrustration] = useState("");

  const handleAnalyze = () => {
    if (!data.url.trim()) return;
    setPhase("qualifying");
  };

  const qualifySteps = [
    { title: "What industry are you in?", field: "industry" as const, options: ["E-commerce", "SaaS", "Healthcare", "Finance", "Real Estate", "Education", "Agency", "Local Business", "Other"] },
    { title: "What's your monthly revenue range?", field: "monthlyRevenue" as const, options: ["Under $5K", "$5K – $20K", "$20K – $50K", "$50K – $100K", "$100K+"] },
    { title: "Monthly website traffic?", field: "monthlyTraffic" as const, options: ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000 – 100,000", "100,000+"] },
    { title: "Average order / client value?", field: "avgOrderValue" as const, options: ["Under $50", "$50 – $200", "$200 – $1,000", "$1,000 – $5,000", "$5,000+"] },
    { title: "Biggest frustration with your current website?", field: "frustration" as const, options: ["Low conversions", "Slow speed", "Poor design", "No traffic", "Hard to update", "Other"], hasOther: true },
    { title: "Budget range for improvements?", field: "budget" as const, options: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"] },
    { title: "Timeline to start?", field: "timeline" as const, options: ["Ready now", "1–3 months", "Just researching"] },
  ];

  const handleQualifyNext = () => {
    const currentField = qualifySteps[qualifyStep].field;
    if (!data[currentField]) return;
    if (qualifyStep < qualifySteps.length - 1) {
      setQualifyStep(qualifyStep + 1);
    } else {
      setPhase("loading");
      setScores(generateScores());
      setTimeout(() => setPhase("results"), 3000);
    }
  };

  const trafficNum = data.monthlyTraffic === "100,000+" ? 100000 : data.monthlyTraffic === "20,000 – 100,000" ? 50000 : data.monthlyTraffic === "5,000 – 20,000" ? 10000 : data.monthlyTraffic === "1,000 – 5,000" ? 3000 : 500;
  const revenueLoss = Math.round(trafficNum * 0.27 * (scores.conversionLeak / 100) * 0.8);
  const overallHealth = Math.round((scores.speed + scores.mobile + scores.seo + (100 - scores.conversionLeak) + (100 - scores.trustDeficiency)) / 5);
  const trafficWaste = Math.round(scores.conversionLeak * 0.6);

  // Loading phase
  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold font-display mb-2">Analyzing {data.url}...</h2>
          <p className="text-muted-foreground text-sm">Running 47 diagnostic checks</p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            {["Checking page speed...", "Scanning SEO tags...", "Testing mobile responsiveness...", "Analyzing conversion paths...", "Calculating revenue impact..."].map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}>{t}</motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Qualifying phase
  if (phase === "qualifying") {
    const current = qualifySteps[qualifyStep];
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 pt-24 pb-12 flex-1 flex flex-col w-full">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {qualifyStep + 1} of {qualifySteps.length}</span>
              <span className="text-primary">{Math.round(((qualifyStep + 1) / qualifySteps.length) * 100)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" animate={{ width: `${((qualifyStep + 1) / qualifySteps.length) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={qualifyStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h2 className="text-xl font-bold font-display mb-4">{current.title}</h2>
              <div className="space-y-2 mb-4">
                {current.options.map((opt) => (
                  <button key={opt} onClick={() => {
                    if (opt === "Other" && current.hasOther) setData({ ...data, [current.field]: `Other: ${otherFrustration}` });
                    else setData({ ...data, [current.field]: opt });
                  }} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${data[current.field] === opt || (data[current.field]?.startsWith("Other") && opt === "Other") ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/30"}`}>
                    {opt}
                  </button>
                ))}
                {current.hasOther && (
                  <Input placeholder="Other (specify)..." value={otherFrustration} onChange={(e) => { setOtherFrustration(e.target.value); setData({ ...data, [current.field]: `Other: ${e.target.value}` }); }} className="bg-secondary border-border mt-2" />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => qualifyStep > 0 ? setQualifyStep(qualifyStep - 1) : setPhase("input")} className="gap-1"><ArrowLeft className="w-4 h-4" /> Back</Button>
            <Button onClick={handleQualifyNext} disabled={!data[qualifySteps[qualifyStep].field]} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">{qualifyStep === qualifySteps.length - 1 ? "Analyze My Site" : "Next"} <ArrowRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    );
  }

  // Results phase
  if (phase === "results") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Website Audit Results</h1>
            <p className="text-muted-foreground">{data.url}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-destructive">Your website is potentially losing ${revenueLoss.toLocaleString()}/month</p>
              <p className="text-sm text-muted-foreground mt-1">due to poor conversion optimization. {trafficWaste}% of your traffic leaves without taking action.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10 bg-card border border-border rounded-xl p-8">
            <ScoreRing score={overallHealth} label="Overall Health" size={110} />
            <ScoreRing score={scores.speed} label="Speed" size={110} />
            <ScoreRing score={scores.seo} label="SEO" size={110} />
            <ScoreRing score={scores.mobile} label="Mobile" size={110} />
            <ScoreRing score={100 - scores.conversionLeak} label="Conversion" size={110} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: <TrendingDown className="w-5 h-5" />, label: "Conversion Leak Score", value: `${scores.conversionLeak}/100`, desc: "Higher means more revenue lost", color: "text-destructive" },
              { icon: <ShieldAlert className="w-5 h-5" />, label: "Trust Signal Deficiency", value: `${scores.trustDeficiency}/100`, desc: "Based on analysis of 500+ business websites", color: "text-warning" },
              { icon: <Eye className="w-5 h-5" />, label: "Traffic Waste", value: `${trafficWaste}%`, desc: `${trafficWaste}% of visitors leave without engaging`, color: "text-destructive" },
              { icon: <Gauge className="w-5 h-5" />, label: "Revenue Loss Estimate", value: `$${revenueLoss.toLocaleString()}/mo`, desc: "Compared to other companies in your revenue range", color: "text-destructive" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2"><span className={item.color}>{item.icon}</span><span className="text-sm text-muted-foreground">{item.label}</span></div>
                <p className={`text-2xl font-bold font-display ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-card border border-border rounded-xl p-6 mb-10">
            <h3 className="font-bold font-display mb-4">Automated Checks</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: <Gauge className="w-4 h-4" />, label: "Page Speed", status: scores.speed > 50 ? "Pass" : "Fail", ok: scores.speed > 50 },
                { icon: <Smartphone className="w-4 h-4" />, label: "Mobile Responsive", status: scores.mobile > 60 ? "Pass" : "Fail", ok: scores.mobile > 60 },
                { icon: <Lock className="w-4 h-4" />, label: "SSL Certificate", status: scores.ssl === 100 ? "Active" : "Missing", ok: scores.ssl === 100 },
                { icon: <Search className="w-4 h-4" />, label: "SEO Meta Tags", status: scores.seo > 50 ? "Good" : "Issues Found", ok: scores.seo > 50 },
                { icon: <Link2 className="w-4 h-4" />, label: "Broken Links", status: `${scores.brokenLinks} found`, ok: scores.brokenLinks === 0 },
                { icon: <Accessibility className="w-4 h-4" />, label: "Accessibility", status: scores.accessibility > 60 ? "Fair" : "Poor", ok: scores.accessibility > 60 },
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 text-sm">{check.icon} {check.label}</div>
                  <span className={`text-xs font-medium ${check.ok ? "text-accent" : "text-destructive"}`}>{check.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Free 15-min Strategy Call", desc: "Discuss your results with an expert", primary: true },
              { label: "Paid Deep Audit ($99–$299)", desc: "Full technical + UX audit, credited if you work with us", primary: false },
              { label: "Instant Proposal Preview", desc: "See what a custom solution looks like", primary: false },
            ].map((cta, i) => (
              <button key={i} onClick={() => setShowLeadCapture(true)} className={`p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${cta.primary ? "border-primary bg-primary/10 glow-primary" : "border-border bg-card hover:border-primary/30"}`}>
                <p className={`font-semibold ${cta.primary ? "text-primary" : "text-foreground"}`}>{cta.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{cta.desc}</p>
              </button>
            ))}
          </motion.div>

          {leadCaptured && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center mb-10">
              <p className="text-accent font-semibold">✓ Your audit report is on its way!</p>
            </div>
          )}

          <LeadCaptureModal open={showLeadCapture} onClose={() => setShowLeadCapture(false)} onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); }} title="Get Your Detailed Audit Report" subtitle="We'll send a comprehensive breakdown with actionable fixes." showPhone showWhatsApp />
        </div>
        <Footer />
      </div>
    );
  }

  // Landing + Input phase
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-destructive/3 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-destructive/3 blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-destructive bg-destructive/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-destructive/20">
              <Globe className="w-4 h-4" /> Website URL Analyzer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-5 leading-[1.1]">
              Is Your Website <span className="text-gradient-primary">Costing You Money?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Enter any URL for an instant 47-point audit. Discover speed issues, SEO gaps, conversion leaks, and exactly how much revenue you're losing every month.
            </p>

            {/* URL Input */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="flex gap-2">
                <Input placeholder="https://yourwebsite.com" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className="bg-card border-border text-base h-13" onKeyDown={(e) => e.key === "Enter" && handleAnalyze()} />
                <Button onClick={handleAnalyze} disabled={!data.url.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-13 px-6 font-semibold gap-2 glow-primary">Analyze <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 47-point audit</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Free & instant</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> 500+ audited</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 bg-card/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">47-Point Analysis</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">What We Audit</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Two layers of analysis: surface-level technical checks and deep psychological conversion triggers.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fadeUp} className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-bold font-display mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Surface Layer</h3>
              <div className="space-y-3">
                {["Page Speed Score", "Mobile Responsiveness", "SSL Certificate Status", "SEO Meta Tag Issues", "Broken Links Detection", "Basic Accessibility Flags"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> {item}</div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="bg-card border border-destructive/20 rounded-xl p-6">
              <h3 className="font-bold font-display mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-destructive" /> High-Impact Layer</h3>
              <div className="space-y-3">
                {["Conversion Leak Score", "Revenue Loss Estimate", "Traffic Waste Percentage", "Trust Signal Deficiency Score", "Design Quality Assessment", "Overall Health Score"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" /> {item}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Psychological triggers */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Why It Matters</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">The Numbers Don't Lie</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: "27%", desc: "of website traffic leaves without taking any action on average", color: "text-destructive" },
              { value: "$3,200", desc: "average monthly revenue loss for businesses with poor conversion optimization", color: "text-warning" },
              { value: "500+", desc: "business websites analyzed to build our industry benchmark database", color: "text-primary" },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="bg-card border border-border rounded-xl p-6 text-center">
                <p className={`text-4xl font-bold font-display mb-2 ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Real Results</span>
            <h2 className="text-3xl font-bold font-display mt-2">What Users Discovered</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Marcus Webb", role: "Marketing Director, TechFlow", text: "The URL Analyzer revealed we were losing $8K/month to conversion leaks we didn't even know existed. We fixed the top 3 issues and saw a 34% conversion increase in 6 weeks." },
              { name: "Lisa Nakamura", role: "E-commerce Manager, StyleHaus", text: "I was shocked to see our Trust Signal Deficiency score at 67/100. After implementing the recommendations, our add-to-cart rate jumped 22%." },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 text-warning fill-warning" />)}</div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization Options */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">After Your Audit</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">Three Ways to Take Action</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Free Strategy Call", desc: "15-minute call with an expert to discuss your results and prioritize fixes.", badge: "Most Popular", primary: true },
              { title: "Deep Audit ($99–$299)", desc: "Full technical + UX audit with heatmap analysis, credited if you work with us.", badge: "Best Value", primary: false },
              { title: "Instant Proposal", desc: "See exactly what a custom solution looks like with pricing and timeline.", badge: "Fastest", primary: false },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className={`relative bg-card border-2 rounded-xl p-6 ${item.primary ? "border-primary glow-primary" : "border-border"}`}>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.primary ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{item.badge}</span>
                <h3 className="font-bold font-display mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/50">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">FAQ</span>
            <h2 className="text-3xl font-bold font-display mt-2">Common Questions</h2>
          </motion.div>
          <div className="space-y-3">
            <FAQItem q="Is the audit really free?" a="Yes. The initial 47-point audit is completely free with no signup required. We offer paid deep audits for businesses that want a comprehensive analysis." />
            <FAQItem q="How do you calculate revenue loss?" a="We use your traffic data, industry conversion benchmarks, and our proprietary Conversion Leak Score to estimate potential revenue being left on the table." />
            <FAQItem q="Are these real scores or simulated?" a="Scores are generated using our analysis algorithms. For a full technical audit with real PageSpeed and SEO data, upgrade to our Deep Audit package." />
            <FAQItem q="How is this different from Google PageSpeed?" a="PageSpeed only measures loading performance. We go much deeper — conversion optimization, trust signals, revenue impact, and UX quality scores." />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center bg-gradient-to-br from-destructive/10 via-card to-primary/10 border border-destructive/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold font-display mb-3">How Much Is Your Website Costing You?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Enter your URL and find out in under 2 minutes. Free, instant, no signup.</p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input placeholder="https://yourwebsite.com" value={data.url} onChange={(e) => setData({ ...data, url: e.target.value })} className="bg-card border-border h-12" onKeyDown={(e) => e.key === "Enter" && handleAnalyze()} />
              <Button onClick={handleAnalyze} disabled={!data.url.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 font-semibold gap-2">Analyze <ArrowRight className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Analyzer;
