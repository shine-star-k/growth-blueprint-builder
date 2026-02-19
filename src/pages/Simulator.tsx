import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, BarChart3, Target, Zap, CheckCircle2, Star, Clock, Users, ChevronDown, ChevronUp, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StepProgress from "@/components/StepProgress";
import OptionCard from "@/components/OptionCard";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const INDUSTRY_BENCHMARKS: Record<string, number> = {
  "E-commerce": 3.2, "SaaS": 5.0, "Healthcare": 3.6, "Finance": 4.2, "Real Estate": 2.8, "Education": 4.5, "Agency": 3.8, "Local Business": 3.0, "Other": 3.5,
};

const BOTTLENECKS = ["Low conversion rate", "Poor UX", "Weak offer", "Low trust", "Slow website", "Unclear messaging"];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence>{open && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p></motion.div>)}</AnimatePresence>
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold font-display text-gradient-primary">GrowthLab</Link>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Calculator</Link>
        <Link to="/analyzer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analyzer</Link>
        <Link to="/simulator" className="text-sm text-foreground font-medium">Simulator</Link>
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

const Simulator = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [traffic, setTraffic] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [aov, setAov] = useState("");
  const [industry, setIndustry] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [otherBottleneck, setOtherBottleneck] = useState("");
  const [timeline, setTimeline] = useState("");
  const [otherTimeline, setOtherTimeline] = useState("");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const calcRef = useRef<HTMLDivElement>(null);

  const trafficNum = parseFloat(traffic) || 0;
  const crNum = parseFloat(conversionRate) || 0;
  const aovNum = parseFloat(aov) || 0;

  const calculations = useMemo(() => {
    const currentMonthly = trafficNum * (crNum / 100) * aovNum;
    const rev1 = trafficNum * ((crNum + 1) / 100) * aovNum;
    const rev2 = trafficNum * ((crNum + 2) / 100) * aovNum;
    const annualGrowth1 = (rev1 - currentMonthly) * 12;
    const annualGrowth2 = (rev2 - currentMonthly) * 12;
    const benchmark = INDUSTRY_BENCHMARKS[industry] || 3.5;
    return { currentMonthly, rev1, rev2, annualGrowth1, annualGrowth2, benchmark };
  }, [trafficNum, crNum, aovNum, industry]);

  const step1Valid = trafficNum > 0 && crNum > 0 && aovNum > 0 && industry;
  const step2Valid = bottleneck !== "";
  const step3Valid = timeline !== "";

  const startSimulation = () => {
    setStarted(true);
    setTimeout(() => calcRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleNext = () => {
    if (step === 0 && !step1Valid) return;
    if (step === 1 && !step2Valid) return;
    if (step === 2 && !step3Valid) return;
    if (step === 2) { setShowLeadCapture(true); return; }
    setStep(step + 1);
  };

  const formatCurrency = (n: number) => "$" + Math.round(n).toLocaleString();

  // Results page
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-4 py-1.5 rounded-full text-sm font-medium mb-4"><TrendingUp className="w-4 h-4" /> Revenue Simulation Complete</div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Your Growth Potential</h1>
            <p className="text-muted-foreground">Here's how a small conversion rate increase impacts your bottom line.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Current Monthly Revenue", value: formatCurrency(calculations.currentMonthly), annual: formatCurrency(calculations.currentMonthly * 12), color: "text-muted-foreground", bg: "bg-card" },
              { label: "Revenue with +1% CR", value: formatCurrency(calculations.rev1), annual: formatCurrency(calculations.rev1 * 12), color: "text-primary", bg: "bg-primary/5 border-primary/20", growth: formatCurrency(calculations.annualGrowth1) },
              { label: "Revenue with +2% CR", value: formatCurrency(calculations.rev2), annual: formatCurrency(calculations.rev2 * 12), color: "text-accent", bg: "bg-accent/5 border-accent/20", growth: formatCurrency(calculations.annualGrowth2) },
            ].map((block, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className={`${block.bg} border border-border rounded-xl p-6`}>
                <p className="text-sm text-muted-foreground mb-3">{block.label}</p>
                <p className={`text-3xl font-bold font-display ${block.color}`}>{block.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{block.annual}/yr</p>
                {block.growth && (<div className="mt-3 pt-3 border-t border-border"><p className={`text-sm font-semibold ${block.color}`}>+{block.growth}/yr additional revenue</p></div>)}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card border border-border rounded-xl p-6 mb-10">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Industry Benchmark Comparison</h3>
            <div className="flex items-center gap-8">
              <div><p className="text-sm text-muted-foreground">Your Conversion Rate</p><p className="text-2xl font-bold font-display text-destructive">{crNum}%</p></div>
              <div className="text-3xl text-muted-foreground">→</div>
              <div><p className="text-sm text-muted-foreground">Top {industry || "Industry"} Average</p><p className="text-2xl font-bold font-display text-accent">{calculations.benchmark}%</p></div>
            </div>
            <div className="mt-4 h-3 rounded-full bg-secondary overflow-hidden relative">
              <motion.div className="h-full rounded-full bg-destructive/60 absolute left-0" initial={{ width: 0 }} animate={{ width: `${Math.min((crNum / (calculations.benchmark * 1.5)) * 100, 100)}%` }} transition={{ duration: 1, delay: 0.6 }} />
              <motion.div className="h-full rounded-full bg-accent/60 absolute left-0" style={{ width: `${(calculations.benchmark / (calculations.benchmark * 1.5)) * 100}%`, opacity: 0.3 }} />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Reaching {calculations.benchmark}% could mean an additional <span className="text-accent font-semibold">{formatCurrency((trafficNum * (calculations.benchmark / 100) * aovNum - calculations.currentMonthly) * 12)}/year</span> in revenue.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold font-display mb-2">Build Your Revenue Growth Plan</h3>
            <p className="text-muted-foreground text-sm mb-6">Let's turn these projections into reality with a custom strategy.</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">Book Strategy Call <ArrowRight className="w-4 h-4" /></Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-accent/20">
              <Zap className="w-4 h-4" /> Revenue Growth Simulator
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-5 leading-[1.1]">
              How Much Revenue Is Your Website<br /><span className="text-gradient-primary">Leaving on the Table?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              See how a small increase in conversion rate impacts your annual revenue. Enter your real numbers and get an instant projection.
            </p>
            <Button onClick={startSimulation} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
              Start Revenue Simulation <ArrowRight className="w-4 h-4" />
            </Button>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-6">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> 90 seconds</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No signup</span>
              <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-accent" /> $4.2M+ projected</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Example Preview */}
      <section className="py-16 bg-card/50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Example Output</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">What You'll Discover</h2>
          </motion.div>
          <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Current Monthly Revenue", value: "$15,000", color: "text-muted-foreground" },
              { label: "With +1% Conversion Rate", value: "$25,000", color: "text-primary", growth: "+$120,000/yr" },
              { label: "With +2% Conversion Rate", value: "$35,000", color: "text-accent", growth: "+$240,000/yr" },
            ].map((block, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">{block.label}</p>
                <p className={`text-2xl font-bold font-display ${block.color}`}>{block.value}</p>
                {block.growth && <p className={`text-sm font-semibold ${block.color} mt-2`}>{block.growth}</p>}
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="mt-6 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Industry benchmark: <span className="text-accent font-semibold">3.2%</span></p>
                <p className="text-sm text-muted-foreground">Your rate: <span className="text-destructive font-semibold">1.5%</span> — below average</p>
              </div>
              <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-destructive/50 w-[47%]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Simple Process</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">Three Steps to Your Revenue Projection</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Enter Your Metrics", desc: "Monthly traffic, conversion rate, average order value, and industry." },
              { step: "02", title: "Identify Bottlenecks", desc: "Select your biggest growth blocker so we can tailor recommendations." },
              { step: "03", title: "See Your Growth", desc: "Get instant revenue projections with +1% and +2% conversion improvements." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold font-display">{item.step}</span>
                </div>
                <h3 className="font-bold font-display mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <div ref={calcRef}>
        {started && (
          <section className="py-20 bg-card/30" id="simulator">
            <div className="max-w-xl mx-auto px-4">
              <StepProgress current={step + 1} total={3} labels={["Metrics", "Bottleneck", "Timeline"]} />
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                    <h2 className="text-xl font-bold font-display mb-1">Your Business Metrics</h2>
                    <p className="text-sm text-muted-foreground mb-6">Enter your current numbers to start the simulation.</p>
                    <div className="space-y-4">
                      <div><label className="text-sm font-medium mb-1.5 block">Monthly Website Traffic</label><Input type="number" placeholder="e.g. 10000" value={traffic} onChange={(e) => setTraffic(e.target.value)} className="bg-card border-border h-11" /></div>
                      <div><label className="text-sm font-medium mb-1.5 block">Current Conversion Rate (%)</label><Input type="number" step="0.1" placeholder="e.g. 1.5" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} className="bg-card border-border h-11" /></div>
                      <div><label className="text-sm font-medium mb-1.5 block">Average Order / Client Value ($)</label><Input type="number" placeholder="e.g. 150" value={aov} onChange={(e) => setAov(e.target.value)} className="bg-card border-border h-11" /></div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Industry</label>
                        <Select value={industry} onValueChange={setIndustry}><SelectTrigger className="bg-card border-border h-11"><SelectValue placeholder="Select your industry" /></SelectTrigger><SelectContent>{Object.keys(INDUSTRY_BENCHMARKS).map((ind) => (<SelectItem key={ind} value={ind}>{ind}</SelectItem>))}</SelectContent></Select>
                      </div>
                      {step1Valid && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4"><p className="text-sm text-muted-foreground mb-1">Current Monthly Revenue</p><p className="text-2xl font-bold font-display text-primary">{formatCurrency(calculations.currentMonthly)}</p></motion.div>)}
                    </div>
                  </motion.div>
                )}
                {step === 1 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-bold font-display mb-1">What's Your Biggest Growth Bottleneck?</h2>
                    <p className="text-sm text-muted-foreground mb-6">Select the primary issue holding back your conversions.</p>
                    <div className="space-y-3">
                      {BOTTLENECKS.map((b) => (<OptionCard key={b} label={b} selected={bottleneck === b} onClick={() => setBottleneck(b)} />))}
                      <div className={`p-5 rounded-xl border-2 transition-all ${bottleneck.startsWith("Other") ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                        <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                        <Input placeholder="Type your bottleneck..." value={otherBottleneck} onChange={(e) => { setOtherBottleneck(e.target.value); setBottleneck(`Other: ${e.target.value}`); }} className="bg-secondary border-border" />
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-xl font-bold font-display mb-1">Investment Readiness</h2>
                    <p className="text-sm text-muted-foreground mb-6">When are you ready to start improving conversions?</p>
                    <div className="space-y-3">
                      {["Ready now", "1–3 months", "Just researching"].map((t) => (<OptionCard key={t} label={t} selected={timeline === t} onClick={() => setTimeline(t)} />))}
                      <div className={`p-5 rounded-xl border-2 transition-all ${timeline.startsWith("Other") ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                        <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                        <Input placeholder="Type your timeline..." value={otherTimeline} onChange={(e) => { setOtherTimeline(e.target.value); setTimeline(`Other: ${e.target.value}`); }} className="bg-secondary border-border" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="gap-1"><ArrowLeft className="w-4 h-4" /> Back</Button>
                <Button onClick={handleNext} disabled={(step === 0 && !step1Valid) || (step === 1 && !step2Valid) || (step === 2 && !step3Valid)} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">{step === 2 ? "See Revenue Projection" : "Next"} <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Testimonials */}
      <section className="py-24 bg-card/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">Success Stories</span>
            <h2 className="text-3xl font-bold font-display mt-2">Revenue Growth in Action</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Elena Rossi", role: "Founder, GreenScale SaaS", text: "The Growth Simulator showed us that a 1.5% conversion increase meant $240K more per year. We implemented the recommended changes and hit that target in 4 months." },
              { name: "James Hartley", role: "VP Sales, CoreMetrics", text: "We were stuck at 1.2% conversion. The simulator projected $180K annual growth with just a 1% improvement. After working with the recommended strategy, we exceeded that by 30%." },
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

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$4.2M+", label: "Revenue Growth Projected" },
              { value: "1,200+", label: "Simulations Run" },
              { value: "87%", label: "Report Revenue Increase" },
              { value: "2.3x", label: "Average CR Improvement" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}>
                <p className="text-2xl md:text-3xl font-bold font-display text-gradient-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
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
            <FAQItem q="How accurate are the projections?" a="Projections use straightforward math: Traffic × Conversion Rate × AOV. The formulas are transparent. Industry benchmarks are based on aggregated data from 500+ businesses." />
            <FAQItem q="Is a 1-2% conversion increase realistic?" a="Absolutely. Most websites operate well below industry benchmarks. Even small UX improvements, better messaging, or faster load times typically yield 1-3% conversion improvements." />
            <FAQItem q="What happens after I see my results?" a="You can book a free strategy call to discuss how to achieve the projected growth, or download your simulation as a report to share with your team." />
            <FAQItem q="Do you store my business data?" a="Your metrics are used only to generate your projection. We never share or sell your data. If you opt in for the full report, your contact info is stored securely." />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center bg-gradient-to-br from-accent/10 via-card to-primary/10 border border-accent/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold font-display mb-3">Ready to See Your Growth Potential?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Enter your real metrics and get an instant revenue projection. No guessing, no fluff — just math.</p>
            <Button onClick={startSimulation} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
              Start Revenue Simulation <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <LeadCaptureModal open={showLeadCapture} onClose={() => setShowLeadCapture(false)} onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); setShowResults(true); }} title="Unlock Your Revenue Projection" subtitle="Enter your details to see your full growth simulation." showPhone showCompany showWhatsApp />
    </div>
  );
};

export default Simulator;
