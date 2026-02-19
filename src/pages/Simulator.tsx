import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, BarChart3, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StepProgress from "@/components/StepProgress";
import OptionCard from "@/components/OptionCard";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Link } from "react-router-dom";

const INDUSTRY_BENCHMARKS: Record<string, number> = {
  "E-commerce": 3.2,
  "SaaS": 5.0,
  "Healthcare": 3.6,
  "Finance": 4.2,
  "Real Estate": 2.8,
  "Education": 4.5,
  "Agency": 3.8,
  "Local Business": 3.0,
  "Other": 3.5,
};

const BOTTLENECKS = [
  "Low conversion rate",
  "Poor UX",
  "Weak offer",
  "Low trust",
  "Slow website",
  "Unclear messaging",
];

const Simulator = () => {
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

  const handleNext = () => {
    if (step === 0 && !step1Valid) return;
    if (step === 1 && !step2Valid) return;
    if (step === 2 && !step3Valid) return;
    if (step === 2) {
      setShowLeadCapture(true);
      return;
    }
    setStep(step + 1);
  };

  const formatCurrency = (n: number) => "$" + Math.round(n).toLocaleString();

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" /> Revenue Simulation Complete
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Your Growth Potential</h1>
            <p className="text-muted-foreground">Here's how a small conversion rate increase impacts your bottom line.</p>
          </motion.div>

          {/* Revenue Blocks */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "Current Monthly Revenue",
                value: formatCurrency(calculations.currentMonthly),
                annual: formatCurrency(calculations.currentMonthly * 12),
                color: "text-muted-foreground",
                bg: "bg-card",
              },
              {
                label: "Revenue with +1% CR",
                value: formatCurrency(calculations.rev1),
                annual: formatCurrency(calculations.rev1 * 12),
                color: "text-primary",
                bg: "bg-primary/5 border-primary/20",
                growth: formatCurrency(calculations.annualGrowth1),
              },
              {
                label: "Revenue with +2% CR",
                value: formatCurrency(calculations.rev2),
                annual: formatCurrency(calculations.rev2 * 12),
                color: "text-accent",
                bg: "bg-accent/5 border-accent/20",
                growth: formatCurrency(calculations.annualGrowth2),
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`${block.bg} border border-border rounded-xl p-6`}
              >
                <p className="text-sm text-muted-foreground mb-3">{block.label}</p>
                <p className={`text-3xl font-bold font-display ${block.color}`}>{block.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{block.annual}/yr</p>
                {block.growth && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className={`text-sm font-semibold ${block.color}`}>+{block.growth}/yr additional revenue</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Benchmark */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-xl p-6 mb-10">
            <h3 className="font-bold font-display mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Industry Benchmark Comparison
            </h3>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-muted-foreground">Your Conversion Rate</p>
                <p className="text-2xl font-bold font-display text-destructive">{crNum}%</p>
              </div>
              <div className="text-3xl text-muted-foreground">→</div>
              <div>
                <p className="text-sm text-muted-foreground">Top {industry || "Industry"} Average</p>
                <p className="text-2xl font-bold font-display text-accent">{calculations.benchmark}%</p>
              </div>
            </div>
            <div className="mt-4 h-3 rounded-full bg-secondary overflow-hidden relative">
              <motion.div
                className="h-full rounded-full bg-destructive/60 absolute left-0"
                initial={{ width: 0 }}
                animate={{ width: `${(crNum / (calculations.benchmark * 1.5)) * 100}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.div
                className="h-full rounded-full bg-accent/60 absolute left-0"
                style={{ width: `${(calculations.benchmark / (calculations.benchmark * 1.5)) * 100}%`, opacity: 0.3 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Reaching {calculations.benchmark}% could mean an additional <span className="text-accent font-semibold">
                {formatCurrency((trafficNum * (calculations.benchmark / 100) * aovNum - calculations.currentMonthly) * 12)}/year
              </span> in revenue.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold font-display mb-2">Build Your Revenue Growth Plan</h3>
            <p className="text-muted-foreground text-sm mb-6">Let's turn these projections into reality with a custom strategy.</p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 glow-primary text-base px-8">
              Book Strategy Call <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-16 pb-8 px-4">
          <div className="inline-flex items-center gap-2 text-accent bg-accent/10 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" /> Revenue Simulator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-3 max-w-2xl mx-auto">
            How Much Revenue Is Your Website <span className="text-gradient-primary">Leaving on the Table?</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">See how a small increase in conversion rate impacts your annual revenue.</p>
        </motion.div>
      )}

      <div className="max-w-xl mx-auto px-4 py-8 flex-1 flex flex-col w-full">
        {step > 0 && (
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        )}

        <StepProgress current={step + 1} total={3} labels={["Metrics", "Bottleneck", "Timeline"]} />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h2 className="text-xl font-bold font-display mb-1">Your Business Metrics</h2>
              <p className="text-sm text-muted-foreground mb-6">Enter your current numbers to start the simulation.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Monthly Website Traffic</label>
                  <Input type="number" placeholder="e.g. 10000" value={traffic} onChange={(e) => setTraffic(e.target.value)} className="bg-card border-border h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Current Conversion Rate (%)</label>
                  <Input type="number" step="0.1" placeholder="e.g. 1.5" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} className="bg-card border-border h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Average Order / Client Value ($)</label>
                  <Input type="number" placeholder="e.g. 150" value={aov} onChange={(e) => setAov(e.target.value)} className="bg-card border-border h-11" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="bg-card border-border h-11">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(INDUSTRY_BENCHMARKS).map((ind) => (
                        <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {step1Valid && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-sm text-muted-foreground mb-1">Current Monthly Revenue</p>
                    <p className="text-2xl font-bold font-display text-primary">{formatCurrency(calculations.currentMonthly)}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h2 className="text-xl font-bold font-display mb-1">What's Your Biggest Growth Bottleneck?</h2>
              <p className="text-sm text-muted-foreground mb-6">Select the primary issue holding back your conversions.</p>
              <div className="space-y-3">
                {BOTTLENECKS.map((b) => (
                  <OptionCard key={b} label={b} selected={bottleneck === b} onClick={() => setBottleneck(b)} />
                ))}
                <div className={`p-5 rounded-xl border-2 transition-all ${
                  bottleneck.startsWith("Other") ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}>
                  <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                  <Input
                    placeholder="Type your bottleneck..."
                    value={otherBottleneck}
                    onChange={(e) => { setOtherBottleneck(e.target.value); setBottleneck(`Other: ${e.target.value}`); }}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
              <h2 className="text-xl font-bold font-display mb-1">Investment Readiness</h2>
              <p className="text-sm text-muted-foreground mb-6">When are you ready to start improving conversions?</p>
              <div className="space-y-3">
                {["Ready now", "1–3 months", "Just researching"].map((t) => (
                  <OptionCard key={t} label={t} selected={timeline === t} onClick={() => setTimeline(t)} />
                ))}
                <div className={`p-5 rounded-xl border-2 transition-all ${
                  timeline.startsWith("Other") ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}>
                  <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                  <Input
                    placeholder="Type your timeline..."
                    value={otherTimeline}
                    onChange={(e) => { setOtherTimeline(e.target.value); setTimeline(`Other: ${e.target.value}`); }}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button onClick={handleNext}
            disabled={(step === 0 && !step1Valid) || (step === 1 && !step2Valid) || (step === 2 && !step3Valid)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">
            {step === 2 ? "See Revenue Projection" : "Next"} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <LeadCaptureModal
        open={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); setShowResults(true); }}
        title="Unlock Your Revenue Projection"
        subtitle="Enter your details to see your full growth simulation."
        showPhone
        showCompany
        showWhatsApp
      />
    </div>
  );
};

export default Simulator;
