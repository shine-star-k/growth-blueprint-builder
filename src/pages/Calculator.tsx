import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Shield, Zap, Target, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StepProgress from "@/components/StepProgress";
import OptionCard from "@/components/OptionCard";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import ScoreRing from "@/components/ScoreRing";
import { Link } from "react-router-dom";

const STEPS = [
  {
    title: "What type of business do you run?",
    subtitle: "This helps us recommend the right website architecture.",
    options: ["E-commerce", "Local Business", "SaaS / Startup", "Corporate", "Personal Brand", "Service-Based Business"],
  },
  {
    title: "What's your primary goal?",
    subtitle: "We'll tailor recommendations to maximize this outcome.",
    options: ["Increase sales", "Generate leads", "Improve branding", "Improve conversion rate", "Increase organic traffic"],
  },
  {
    title: "What's your current situation?",
    subtitle: "Understanding where you are helps us plan the path forward.",
    options: ["Already have a website", "Outdated website", "No website yet", "Low conversion rate", "Poor traffic"],
  },
  {
    title: "What's your budget range?",
    subtitle: "We'll recommend solutions that fit your investment capacity.",
    options: ["$500 – $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"],
  },
  {
    title: "When are you looking to start?",
    subtitle: "This helps us prioritize the right strategy for your timeline.",
    options: ["Ready now", "1–3 months", "Just researching"],
  },
];

const getResults = (answers: Record<number, string>) => {
  const businessType = answers[0] || "";
  const goal = answers[1] || "";
  const budget = answers[3] || "";

  const techStacks: Record<string, string> = {
    "E-commerce": "Next.js + Shopify / WooCommerce + Stripe",
    "Local Business": "WordPress + Local SEO Suite",
    "SaaS / Startup": "React + Node.js + PostgreSQL",
    "Corporate": "Next.js + Headless CMS + CDN",
    "Personal Brand": "Astro / Gatsby + Markdown CMS",
    "Service-Based Business": "WordPress + Booking System + CRM",
  };

  const websiteTypes: Record<string, string> = {
    "E-commerce": "High-Converting E-commerce Platform",
    "Local Business": "Local Business Authority Website",
    "SaaS / Startup": "SaaS Product Marketing + App Platform",
    "Corporate": "Enterprise Corporate Portal",
    "Personal Brand": "Personal Brand Showcase & Blog",
    "Service-Based Business": "Lead-Gen Service Website with Booking",
  };

  const investmentRanges: Record<string, string> = {
    "$500 – $1,000": "$800 – $1,500",
    "$1,000 – $3,000": "$2,000 – $4,500",
    "$3,000 – $10,000": "$5,000 – $12,000",
    "$10,000+": "$12,000 – $30,000+",
  };

  const conversionScore = goal === "Improve conversion rate" ? 87 :
    goal === "Increase sales" ? 82 :
    goal === "Generate leads" ? 78 : 72;

  const features = [
    "Responsive mobile-first design",
    "SEO optimization suite",
    goal === "Increase sales" ? "A/B testing framework" : "Lead capture system",
    "Analytics & conversion tracking",
    businessType === "E-commerce" ? "Product catalog & cart" : "Contact forms & CRM integration",
    "Performance optimization (< 2s load time)",
  ];

  return {
    websiteType: websiteTypes[businessType] || "Custom Business Website",
    techStack: techStacks[businessType] || "React + Headless CMS",
    investment: investmentRanges[budget] || "$2,000 – $5,000",
    roi: "320% – 580% within 12 months",
    conversionScore,
    features,
  };
};

const Calculator = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [otherValues, setOtherValues] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [step]: option });
  };

  const handleOther = (value: string) => {
    setOtherValues({ ...otherValues, [step]: value });
    setAnswers({ ...answers, [step]: `Other: ${value}` });
  };

  const handleNext = () => {
    if (!answers[step]) return;
    if (isLastStep) {
      setShowResults(true);
    } else {
      setStep(step + 1);
    }
  };

  const results = getResults(answers);

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-card border border-border rounded-xl p-6"
              >
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
                <li key={i} className="flex items-center gap-2 text-sm text-secondary-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
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

          <LeadCaptureModal
            open={showLeadCapture}
            onClose={() => setShowLeadCapture(false)}
            onSubmit={() => { setLeadCaptured(true); setShowLeadCapture(false); }}
            title="Unlock Your Full Strategy Report"
            subtitle="Get a detailed PDF with actionable steps tailored to your business."
            showWhatsApp
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-2xl mx-auto px-4 py-12 flex-1 flex flex-col w-full">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">What Website Do You Actually Need?</h1>
          <p className="text-muted-foreground text-sm">Answer a few questions and get a tailored recommendation.</p>
        </div>

        <StepProgress current={step + 1} total={STEPS.length} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <h2 className="text-xl font-bold font-display mb-1">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">{currentStep.subtitle}</p>

            <div className="space-y-3 mb-6">
              {currentStep.options.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={answers[step] === option}
                  onClick={() => handleSelect(option)}
                />
              ))}
              {/* Other option */}
              <div className={`p-5 rounded-xl border-2 transition-all ${
                answers[step]?.startsWith("Other:") ? "border-primary bg-primary/10" : "border-border bg-card"
              }`}>
                <p className="text-sm text-muted-foreground mb-2">Other (specify):</p>
                <Input
                  placeholder="Type your answer..."
                  value={otherValues[step] || ""}
                  onChange={(e) => handleOther(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[step]}
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1"
          >
            {isLastStep ? "See My Results" : "Next"} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
