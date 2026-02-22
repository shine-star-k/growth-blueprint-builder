import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  description?: string;
}

const OptionCard = ({ label, selected, onClick, icon, description }: OptionCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative w-full text-left p-5 rounded-lg border-2 transition-all duration-200 ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-primary text-xl">{icon}</span>}
        <div className="flex-1">
          <p className={`font-medium ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <div className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}>
          {selected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
        </div>
      </div>
    </motion.button>
  );
};

export default OptionCard;
