import { motion } from "framer-motion";
import { ArrowRight, Calculator, Globe, TrendingUp, Sparkles, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Smart Website Calculator",
    description: "Discover exactly what type of website your business needs with a personalized strategy recommendation.",
    icon: <Calculator className="w-7 h-7" />,
    href: "/calculator",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "hover:border-primary/40",
    iconColor: "text-primary",
  },
  {
    title: "Website URL Analyzer",
    description: "Instant visual audit of any website. Uncover speed issues, SEO gaps, conversion leaks, and revenue loss.",
    icon: <Globe className="w-7 h-7" />,
    href: "/analyzer",
    gradient: "from-destructive/20 to-destructive/5",
    borderColor: "hover:border-destructive/40",
    iconColor: "text-destructive",
  },
  {
    title: "Growth Simulator",
    description: "See how a small conversion rate increase can dramatically impact your annual revenue.",
    icon: <TrendingUp className="w-7 h-7" />,
    href: "/simulator",
    gradient: "from-accent/20 to-accent/5",
    borderColor: "hover:border-accent/40",
    iconColor: "text-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Free Growth Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 leading-tight">
              Stop Guessing. <br />
              <span className="text-gradient-primary">Start Growing.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Three powerful tools to diagnose your website's potential, uncover hidden revenue, and build a clear growth roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                to={tool.href}
                className={`group block h-full bg-gradient-to-b ${tool.gradient} border-2 border-border ${tool.borderColor} rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className={`w-14 h-14 rounded-xl bg-card flex items-center justify-center mb-5 ${tool.iconColor}`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{tool.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto"
        >
          {[
            { icon: <Zap className="w-4 h-4" />, value: "500+", label: "Websites Analyzed" },
            { icon: <BarChart3 className="w-4 h-4" />, value: "3.2x", label: "Average ROI" },
            { icon: <TrendingUp className="w-4 h-4" />, value: "87%", label: "See Revenue Growth" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">{stat.icon}</div>
              <p className="text-2xl font-bold font-display">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
