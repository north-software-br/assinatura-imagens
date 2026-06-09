import { useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CompanyConfig } from "../data/companies";

interface CompanyTabsProps {
  companies: CompanyConfig[];
  value: string;
  onValueChange: (id: string) => void;
}

/**
 * Barra de abas para selecionar a empresa ativa.
 * Reaproveita o padrão visual do shadcn-space tabs-05 (sublinhado animado +
 * realce no hover via `motion`), mas é dirigida pelos dados de `companies`.
 */
export function CompanyTabs({ companies, value, onValueChange }: CompanyTabsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Tabs value={value} onValueChange={onValueChange} className="company-tabs">
      <TabsList
        aria-label="Selecionar empresa"
        className="company-tabs__list"
        onMouseLeave={() => setHovered(null)}
      >
        {companies.map((company) => {
          const isActive = company.id === value;
          const isHovered = hovered === company.id;
          const tabStyle = {
            "--company-accent": company.colors.accent,
            "--company-brand": company.colors.brand,
          } as CSSProperties;

          return (
            <TabsTrigger
              key={company.id}
              value={company.id}
              onMouseEnter={() => setHovered(company.id)}
              style={tabStyle}
              className={cn(
                "company-tabs__trigger",
                isActive && "company-tabs__trigger--active",
              )}
            >
              <span className="company-tabs__trigger-inner">
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      layoutId="company-tab-hover"
                      className="company-tabs__hover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                <Building2 className="company-tabs__icon" aria-hidden />
                <span className="company-tabs__name">{company.name}</span>
              </span>

              {isActive && (
                <motion.div
                  layoutId="company-tab-indicator"
                  className="company-tabs__indicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
