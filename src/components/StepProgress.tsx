import { motion } from "framer-motion";

interface StepProgressProps {
  current: number;
  total: number;
  labels?: string[];
}

const StepProgress = ({ current, total, labels }: StepProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted-foreground">Step {current} of {total}</span>
        <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, i) => (
            <span
              key={i}
              className={`text-xs ${i + 1 <= current ? "text-primary" : "text-muted-foreground"}`}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepProgress;
