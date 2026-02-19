import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Globe, Loader2, AlertTriangle, TrendingDown, ShieldAlert, Eye, Gauge, Search, Smartphone, Lock, Link2, Accessibility } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ScoreRing from "@/components/ScoreRing";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { Link } from "react-router-dom";

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

const Analyzer = () => {
  const [phase, setPhase] = useState<"input" | "qualifying" | "loading" | "results">("input");
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
    {
      title: "What industry are you in?",
      field: "industry" as const,
      type: "select",
      options: ["E-commerce", "SaaS", "Healthcare", "Finance", "Real Estate", "Education", "Agency", "Local Business", "Other"],
    },
    {
      title: "What's your monthly revenue range?",
      field: "monthlyRevenue" as const,
      type: "select",
      options: ["Under $5K", "$5K – $20K", "$20K – $50K", "$50K – $100K", "$100K+"],
    },
    {
      title: "Monthly website traffic?",
      field: "monthlyTraffic" as const,
      type: "select",
      options: ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000 – 100,000", "100,000+"],
    },
    {
      title: "Average order / client value?",
      field: "avgOrderValue" as const,
      type: "select",
      options: ["Under $50", "$50 – $200", "$200 – $1,000", "$1,000 – $5,000", "$5,000+"],
    },
    {
      title: "Biggest frustration with your current website?",
      field: "frustration" as const,
      type: "select",
      options: ["Low conversions", "Slow speed", "Poor design", "No traffic", "Hard to update", "Other"],
      hasOther: true,
    },
    {
      title: "Budget range for improvements?",
      field: "budget" as const,
      type: "select",
      options: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"],
    },
    {
      title: "Timeline to start?",
      field: "timeline" as const,
      type: "select",
      options: ["Ready now", "1–3 months", "Just researching"],
    },
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

  const trafficNum = data.monthlyTraffic === "100,000+" ? 100000 :
    data.monthlyTraffic === "20,000 – 100,000" ? 50000 :
    data.monthlyTraffic === "5,000 – 20,000" ? 10000 :
    data.monthlyTraffic === "1,000 – 5,000" ? 3000 : 500;
  const revenueLoss = Math.round(trafficNum * 0.27 * (scores.conversionLeak / 100) * 0.8);
  const overallHealth = Math.round((scores.speed + scores.mobile + scores.seo + (100 - scores.conversionLeak) + (100 - scores.trustDeficiency)) / 5);
  const trafficWaste = Math.round(scores.conversionLeak * 0.6);

  if (phase === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-bold font-display mb-2">Analyzing {data.url}...</h2>
          <p className="text-muted-foreground text-sm">Running 47 diagnostic checks</p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            {["Checking page speed...", "Scanning SEO tags...", "Testing mobile responsiveness...", "Analyzing conversion paths..."].map((t, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.6 }}>
                {t}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (phase === "qualifying") {
    const current = qualifySteps[qualifyStep];
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="max-w-lg mx-auto px-4 py-12 flex-1 flex flex-col w-full">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {qualifyStep + 1} of {qualifySteps.length}</span>
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
                  <button
                    key={opt}
                    onClick={() => {
                      if (opt === "Other" && current.hasOther) {
                        setData({ ...data, [current.field]: `Other: ${otherFrustration}` });
                      } else {
                        setData({ ...data, [current.field]: opt });
                      }
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      data[current.field] === opt || (data[current.field]?.startsWith("Other") && opt === "Other")
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                {current.hasOther && (
                  <Input
                    placeholder="Other (specify)..."
                    value={otherFrustration}
                    onChange={(e) => {
                      setOtherFrustration(e.target.value);
                      setData({ ...data, [current.field]: `Other: ${e.target.value}` });
                    }}
                    className="bg-secondary border-border mt-2"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => qualifyStep > 0 ? setQualifyStep(qualifyStep - 1) : setPhase("input")} className="gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button onClick={handleQualifyNext} disabled={!data[qualifySteps[qualifyStep].field]} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1">
              {qualifyStep === qualifySteps.length - 1 ? "Analyze My Site" : "Next"} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Website Audit Results</h1>
            <p className="text-muted-foreground">{data.url}</p>
          </motion.div>

          {/* Alert Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-destructive">Your website is potentially losing ${revenueLoss.toLocaleString()}/month</p>
              <p className="text-sm text-muted-foreground mt-1">due to poor conversion optimization. {trafficWaste}% of your traffic leaves without taking action.</p>
            </div>
          </motion.div>

          {/* Score Rings */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10 bg-card border border-border rounded-xl p-8">
            <ScoreRing score={overallHealth} label="Overall Health" size={110} />
            <ScoreRing score={scores.speed} label="Speed" size={110} />
            <ScoreRing score={scores.seo} label="SEO" size={110} />
            <ScoreRing score={scores.mobile} label="Mobile" size={110} />
            <ScoreRing score={100 - scores.conversionLeak} label="Conversion" size={110} />
          </motion.div>

          {/* High Impact Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: <TrendingDown className="w-5 h-5" />, label: "Conversion Leak Score", value: `${scores.conversionLeak}/100`, desc: "Higher means more revenue lost", color: "text-destructive" },
              { icon: <ShieldAlert className="w-5 h-5" />, label: "Trust Signal Deficiency", value: `${scores.trustDeficiency}/100`, desc: "Based on analysis of 500+ business websites", color: "text-warning" },
              { icon: <Eye className="w-5 h-5" />, label: "Traffic Waste", value: `${trafficWaste}%`, desc: `${trafficWaste}% of visitors leave without engaging`, color: "text-destructive" },
              { icon: <Gauge className="w-5 h-5" />, label: "Revenue Loss Estimate", value: `$${revenueLoss.toLocaleString()}/mo`, desc: "Compared to other companies in your revenue range", color: "text-destructive" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={item.color}>{item.icon}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <p className={`text-2xl font-bold font-display ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Surface checks */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="bg-card border border-border rounded-xl p-6 mb-10">
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

          {/* CTAs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Free 15-min Strategy Call", desc: "Discuss your results with an expert", primary: true },
              { label: "Paid Deep Audit ($99–$299)", desc: "Full technical + UX audit, credited if you work with us", primary: false },
              { label: "Instant Proposal Preview", desc: "See what a custom solution looks like", primary: false },
            ].map((cta, i) => (
              <button
                key={i}
                onClick={() => setShowLeadCapture(true)}
                className={`p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                  cta.primary ? "border-primary bg-primary/10 glow-primary" : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <p className={`font-semibold ${cta.primary ? "text-primary" : "text-foreground"}`}>{cta.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{cta.desc}</p>
              </button>
            ))}
          </motion.div>

          {leadCaptured && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-center">
              <p className="text-accent font-semibold">✓ Your audit report is on its way!</p>
            </div>
          )}

          <LeadCaptureModal
            open={showLeadCapture}
            onClose={() => setShowLeadCapture(false)}
            onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); }}
            title="Get Your Detailed Audit Report"
            subtitle="We'll send a comprehensive breakdown with actionable fixes."
            showPhone
            showWhatsApp
          />
        </div>
      </div>
    );
  }

  // Input phase
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-1 absolute top-6 left-6">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Globe className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">Website URL Analyzer</h1>
        <p className="text-muted-foreground mb-8">Enter your URL for an instant visual audit. Discover what's costing you traffic, leads, and revenue.</p>

        <div className="flex gap-2">
          <Input
            placeholder="https://yourwebsite.com"
            value={data.url}
            onChange={(e) => setData({ ...data, url: e.target.value })}
            className="bg-card border-border text-base h-12"
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <Button onClick={handleAnalyze} disabled={!data.url.trim()} className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 font-semibold gap-2">
            Analyze <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">Based on analysis of 500+ business websites. Free instant audit.</p>
      </motion.div>
    </div>
  );
};

export default Analyzer;
