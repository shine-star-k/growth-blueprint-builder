import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadCaptureModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => void;
  title?: string;
  subtitle?: string;
  showPhone?: boolean;
  showCompany?: boolean;
  showWhatsApp?: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  whatsapp?: string;
}

const LeadCaptureModal = ({
  open,
  onClose,
  onSubmit,
  title = "Unlock Your Full Report",
  subtitle = "Get your personalized strategy delivered instantly.",
  showPhone = false,
  showCompany = false,
  showWhatsApp = true,
}: LeadCaptureModalProps) => {
  const [data, setData] = useState<LeadData>({ name: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name.trim() && data.email.trim()) {
      onSubmit(data);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-2xl p-8 relative glow-primary"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-display">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                placeholder="Your Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="bg-secondary border-border"
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="bg-secondary border-border"
                required
              />
              {showCompany && (
                <Input
                  placeholder="Company Name"
                  value={data.company || ""}
                  onChange={(e) => setData({ ...data, company: e.target.value })}
                  className="bg-secondary border-border"
                />
              )}
              {showPhone && (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Phone (optional)"
                    value={data.phone || ""}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    className="bg-secondary border-border pl-10"
                  />
                </div>
              )}
              {showWhatsApp && (
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="WhatsApp Number (optional)"
                    value={data.whatsapp || ""}
                    onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                    className="bg-secondary border-border pl-10"
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
                Get My Report <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
