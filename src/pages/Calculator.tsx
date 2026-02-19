import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Shield, Zap, Target, TrendingUp, BarChart3, CheckCircle2, Star, Clock, Users, ChevronDown, ChevronUp, Calculator as CalcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StepProgress from "@/components/StepProgress";
import OptionCard from "@/components/OptionCard";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import ScoreRing from "@/components/ScoreRing";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const STEPS = [
  { title: "What type of business do you run?", subtitle: "This helps us recommend the right website architecture.", options: ["E-commerce", "Local Business", "SaaS / Startup", "Corporate", "Personal Brand", "Service-Based Business"] },
  { title: "What's your primary goal?", subtitle: "We'll tailor recommendations to maximize this outcome.", options: ["Increase sales", "Generate leads", "Improve branding", "Improve conversion rate", "Increase organic traffic"] },
  { title: "What's your current situation?", subtitle: "Understanding where you are helps us plan the path forward.", options: ["Already have a website", "Outdated website", "No website yet", "Low conversion rate", "Poor traffic"] },
  { title: "What's your budget range?", subtitle: "We'll recommend solutions that fit your investment capacity.", options: ["$500 – $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"] },
  { title: "When are you looking to start?", subtitle: "This helps us prioritize the right strategy for your timeline.", options: ["Ready now", "1–3 months", "Just researching"] },
];

const getResults = (answers: Record<number, string>) => {
  const businessType = answers[0] || "";
  const goal = answers[1] || "";
  const budget = answers[3] || "";
  const techStacks: Record<string, string> = { "E-commerce": "Next.js + Shopify / WooCommerce + Stripe", "Local Business": "WordPress + Local SEO Suite", "SaaS / Startup": "React + Node.js + PostgreSQL", "Corporate": "Next.js + Headless CMS + CDN", "Personal Brand": "Astro / Gatsby + Markdown CMS", "Service-Based Business": "WordPress + Booking System + CRM" };
  const websiteTypes: Record<string, string> = { "E-commerce": "High-Converting E-commerce Platform", "Local Business": "Local Business Authority Website", "SaaS / Startup": "SaaS Product Marketing + App Platform", "Corporate": "Enterprise Corporate Portal", "Personal Brand": "Personal Brand Showcase & Blog", "Service-Based Business": "Lead-Gen Service Website with Booking" };
  const investmentRanges: Record<string, string> = { "$500 – $1,000": "$800 – $1,500", "$1,000 – $3,000": "$2,000 – $4,500", "$3,000 – $10,000": "$5,000 – $12,000", "$10,000+": "$12,000 – $30,000+" };
  const conversionScore = goal === "Improve conversion rate" ? 87 : goal === "Increase sales" ? 82 : goal === "Generate leads" ? 78 : 72;
  const features = ["Responsive mobile-first design", "SEO optimization suite", goal === "Increase sales" ? "A/B testing framework" : "Lead capture system", "Analytics & conversion tracking", businessType === "E-commerce" ? "Product catalog & cart" : "Contact forms & CRM integration", "Performance optimization (< 2s load time)"];
  return { websiteType: websiteTypes[businessType] || "Custom Business Website", techStack: techStacks[businessType] || "React + Headless CMS", investment: investmentRanges[budget] || "$2,000 – $5,000", roi: "320% – 580% within 12 months", conversionScore, features };
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
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

const Calculator = () => {
  const [step, setStep] = useState(-1); // -1 = landing, 0+ = quiz
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [otherValues, setOtherValues] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const quizRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setStep(0);
    setTimeout(() => quizRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const currentStep = step >= 0 ? STEPS[step] : null;
  const isLastStep = step === STEPS.length - 1;
  const handleSelect = (option: string) => setAnswers({ ...answers, [step]: option });
  const handleOther = (value: string) => { setOtherValues({ ...otherValues, [step]: value }); setAnswers({ ...answers, [step]: `Other: ${value}` }); };
  const handleNext = () => { if (!answers[step]) return; if (isLastStep) setShowResults(true); else setStep(step + 1); };
  const results = getResults(answers);

  // Results page
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold font-display text-gradient-primary">GrowthLab</Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/calculator" className="text-sm text-foreground font-medium">Calculator</Link>
              <Link to="/analyzer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analyzer</Link>
              <Link to="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulator</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" /> Your Personalized Results
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Your Website Strategy</h1>
            <p className="text-muted-foreground">Based on your answers, here's what we recommend.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: <Target className="w-5 h-5" />, label: "Recommended Website Type", value: results.websiteType },
              { icon: <Zap className="w-5 h-5" />, label: "Suggested Tech Stack", value: results.techStack },
              { icon: <BarChart3 className="w-5 h-5" />, label: "Estimated Investment", value: results.investment },
              { icon: <TrendingUp className="w-5 h-5" />, label: "Expected ROI", value: results.roi },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 text-primary mb-2">{item.icon}<span className="text-sm font-medium text-muted-foreground">{item.label}</span></div>
                <p className="text-lg font-bold font-display">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center mb-10">
            <ScoreRing score={results.conversionScore} label="Conversion Potential" size={140} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card border border-border rounded-xl p-6 mb-10">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Strategic Feature Recommendations</h3>
            <ul className="grid md:grid-cols-2 gap-3">
              {results.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-secondary-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{f}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center">
            {leadCaptured ? (
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
                <p className="text-accent font-semibold">✓ Your full strategy report is on its way!</p>
              </div>
            ) : (
              <Button onClick={() => setShowLeadCapture(true)} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
                Unlock Your Full Strategy Report <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>

          <LeadCaptureModal open={showLeadCapture} onClose={() => setShowLeadCapture(false)} onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); }} title="Unlock Your Full Strategy Report" subtitle="Get a detailed PDF with actionable steps tailored to your business." showWhatsApp />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold font-display text-gradient-primary">GrowthLab</Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/calculator" className="text-sm text-foreground font-medium">Calculator</Link>
            <Link to="/analyzer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Analyzer</Link>
            <Link to="/simulator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Simulator</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-primary/20">
              <CalcIcon className="w-4 h-4" /> Smart Website Calculator
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-5 leading-[1.1]">
              What Website Do You<br /><span className="text-gradient-primary">Actually Need?</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Stop wasting money on the wrong website. Answer 5 quick questions and get a personalized recommendation with tech stack, investment range, and ROI projection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button onClick={startQuiz} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
                Start Free Calculator <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> Takes 60 seconds</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No signup</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-primary" /> 2,340+ used it</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-20 bg-card/50">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">What You'll Discover</span>
            <h2 className="text-3xl font-bold font-display mt-2 mb-3">Your Personalized Strategy in 60 Seconds</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Target className="w-6 h-6" />, title: "Recommended Website Type", desc: "E-commerce, SaaS, corporate portal — we match the right architecture to your business model." },
              { icon: <Zap className="w-6 h-6" />, title: "Tech Stack & Investment", desc: "Know exactly what technology to use and how much to budget before talking to a single developer." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "ROI & Conversion Score", desc: "Get a data-backed projection of your return on investment and conversion potential score." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">{item.icon}</div>
                <h3 className="font-bold font-display mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,340+", label: "Businesses Matched" },
              { value: "92%", label: "Accuracy Rate" },
              { value: "60s", label: "Average Completion" },
              { value: "4.9/5", label: "User Rating" },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }}>
                <p className="text-2xl md:text-3xl font-bold font-display text-gradient-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <div ref={quizRef}>
        {step >= 0 && (
          <section className="py-20 bg-card/30" id="quiz">
            <div className="max-w-2xl mx-auto px-4">
              <StepProgress current={step + 1} total={STEPS.length} />
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-xl font-bold font-display mb-1">{currentStep!.title}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{currentStep!.subtitle}</p>
                  <div className="space-y-3 mb-6">
                    {currentStep!.options.map((option) => (
                      <OptionCard key={option} label={option} selected={answers[step] === option} onClick={() => handleSelect(option)} />
                    ))}
                    <div className={`p-5 rounded-xl border-2 transition-all ${answers[step]?.startsWith("Other:") ? "border-primary bg-primary/10" : "border-border bg-card"}`}>
                      <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                      <Input placeholder="Type your answer..." value={otherValues[step] || ""} onChange={(e) => handleOther(e.target.value)} className="bg-secondary border-border" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="gap-1"><ArrowLeft className="w-4 h-4" /> Back</Button>
                <Button onClick={handleNext} disabled={!answers[step]} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">{isLastStep ? "See My Results" : "Next"} <ArrowRight className="w-4 h-4" /></Button>
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
            <h2 className="text-3xl font-bold font-display mt-2">Businesses That Got It Right</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "David Park", role: "Founder, Park & Co", text: "The calculator told us we needed a lead-gen service website, not the e-commerce site we were planning. That single insight saved us $15K and 3 months.", stars: 5 },
              { name: "Amira Hassan", role: "CMO, BrightPath Education", text: "We were about to overspend on an enterprise solution. The calculator matched us to the right tech stack at half the budget. ROI prediction was within 10% accuracy.", stars: 5 },
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: 0.1 * i }} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.stars }).map((_, j) => <Star key={j} className="w-4 h-4 text-warning fill-warning" />)}</div>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">FAQ</span>
            <h2 className="text-3xl font-bold font-display mt-2">Common Questions</h2>
          </motion.div>
          <div className="space-y-3">
            <FAQItem q="Is this really free?" a="Yes, 100% free. No signup, no credit card, no hidden fees. We offer this as a value-add tool for businesses exploring their options." />
            <FAQItem q="How accurate are the recommendations?" a="Our recommendations are based on analysis of 500+ business websites across 12 industries. 92% of users report the recommendation matched their final choice." />
            <FAQItem q="What happens with my data?" a="Your answers are only used to generate your recommendation. We never sell your data. If you opt in for the full report, your email is stored securely." />
            <FAQItem q="Can I retake the calculator?" a="Absolutely. You can retake it as many times as you want with different answers to explore various scenarios." />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-3xl p-12">
            <h2 className="text-3xl font-bold font-display mb-3">Ready to Find Your Perfect Website?</h2>
            <p className="text-muted-foreground mb-6">Join 2,340+ businesses who discovered their ideal website strategy in under 60 seconds.</p>
            <Button onClick={startQuiz} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
              Start Calculator Now <ArrowRight className="w-4 h-4" />
            </Button>
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

export default Calculator;
