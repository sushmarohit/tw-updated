'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, FileCheck, BadgeCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResourceGateModal } from '@/components/resources/resource-gate-modal';
import { trackDownloadClick } from '@/lib/analytics/events';
import { RoiFrameworkPanel } from '@/components/resources/bck-panels/roi-framework-panel';
import { ImpactPanel } from '@/components/resources/bck-panels/impact-panel';
import { CbaPanel } from '@/components/resources/bck-panels/cba-panel';
import { CaseStudiesPanel } from '@/components/resources/bck-panels/case-studies-panel';
import { cn } from '@/lib/utils';

const TILE_TRANSITION = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };

type TileId = 'roi' | 'impact' | 'cba' | 'cases';

type GateConfig = {
  open: boolean;
  title: string;
  templateCode: string;
  gateType: 'full_kit' | 'section_download';
};

const initialGate: GateConfig = {
  open: false,
  title: 'Download',
  templateCode: 'FULL_KIT',
  gateType: 'section_download',
};

export function BusinessCaseKitTiles() {
  const [openId, setOpenId] = useState<TileId | null>(null);
  const [gate, setGate] = useState<GateConfig>(initialGate);
  const panelRefs = useRef<Record<TileId, HTMLDivElement | null>>({
    roi: null,
    impact: null,
    cba: null,
    cases: null,
  });

  const setPanelRef = useCallback((id: TileId) => (el: HTMLDivElement | null) => {
    panelRefs.current[id] = el;
  }, []);

  useEffect(() => {
    if (openId === null) return;
    const id = openId;
    const timer = window.setTimeout(() => {
      panelRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [openId]);

  const toggle = (id: TileId) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const openDownloadGate = (title: string, templateCode: string) => {
    trackDownloadClick({
      resource_type: 'business_case_kit',
      template_code: templateCode,
      gate_type: 'gated_modal',
    });
    setGate({
      open: true,
      title,
      templateCode,
      gateType: templateCode === 'FULL_KIT' ? 'full_kit' : 'section_download',
    });
  };

  const tiles: {
    id: TileId;
    icon: typeof Calculator;
    iconWrap: string;
    title: string;
    description: string;
    downloadLabel?: string;
    templateCode?: string;
    panel: ReactNode;
  }[] = [
    {
      id: 'roi',
      icon: Calculator,
      iconWrap: 'bg-teal-100 text-teal-600',
      title: 'ROI Calculation Framework',
      description:
        'Learn how to calculate ROI for operational investments, including direct savings and indirect benefits.',
      downloadLabel: 'Download ROI Framework Template (Google Sheet)',
      templateCode: 'ROI_FRAMEWORK',
      panel: <RoiFrameworkPanel />,
    },
    {
      id: 'impact',
      icon: TrendingUp,
      iconWrap: 'bg-teal-100 text-teal-600',
      title: 'Measuring Operational Impact',
      description: 'Understand how to quantify improvements in efficiency, quality, and governance maturity.',
      downloadLabel: 'Download Impact Measurement Template (Google Sheet)',
      templateCode: 'IMPACT_MEASUREMENT',
      panel: <ImpactPanel />,
    },
    {
      id: 'cba',
      icon: FileCheck,
      iconWrap: 'bg-teal-100 text-teal-600',
      title: 'Cost-Benefit Analysis Templates',
      description: 'Ready-to-use templates for conducting comprehensive cost-benefit analyses.',
      downloadLabel: 'Download CBA Template Pack — 3 files (Google Sheet bundle)',
      templateCode: 'CBA_PACK',
      panel: <CbaPanel />,
    },
    {
      id: 'cases',
      icon: BadgeCheck,
      iconWrap: 'bg-teal-100 text-teal-600',
      title: 'ROI Case Studies',
      description: 'Real examples of ROI achieved by TwelfthKey clients across different industries.',
      panel: <CaseStudiesPanel />,
    },
  ];

  return (
    <>
      <div className="space-y-4 max-w-4xl mx-auto">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const isOpen = openId === tile.id;
          return (
            <div
              key={tile.id}
              ref={setPanelRef(tile.id)}
              className="card overflow-hidden p-0 border border-gray-200 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(tile.id)}
                className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-gray-50/80 transition-colors"
                aria-expanded={isOpen}
              >
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', tile.iconWrap)}>
                  <Icon className="w-6 h-6" aria-hidden />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="heading-h4 mb-1">{tile.title}</h2>
                  <p className="body-default text-gray-600">{tile.description}</p>
                </div>
                <ChevronDown
                  className={cn(
                    'w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300 mt-1',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>

              <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0 }}
                transition={TILE_TRANSITION}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                  {tile.panel}
                  {tile.downloadLabel && tile.templateCode ? (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => openDownloadGate(tile.downloadLabel!, tile.templateCode!)}
                      >
                        {tile.downloadLabel}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <ResourceGateModal
        open={gate.open}
        onOpenChange={(open) => setGate((g) => ({ ...g, open }))}
        title={gate.title}
        templateCode={gate.templateCode}
        gateType={gate.gateType}
        onSuccessAfterSubmit={(url) => {
          if (url) window.open(url, '_blank', 'noopener,noreferrer');
        }}
      />
    </>
  );
}
