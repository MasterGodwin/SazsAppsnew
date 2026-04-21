import React, { useState } from "react";
import Loader from "../../component/Fields/Loader/loadercomponent";
import type { LoaderSize, LoaderVariant } from "../../component/Fields/Loader/loadercomponent";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#1a2332] border border-[#2d3748] rounded-xl py-6 px-7 mb-6">
    <h2 className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#6b7280] mb-5">
      {title}
    </h2>
    {children}
  </div>
);

const Card: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="bg-[#111827] border border-[#2d3748] rounded-[10px] py-5 px-4 flex flex-col items-center gap-3.5 min-w-[120px]">
    {children}
    <span className="text-[11px] text-[#6b7280]">{label}</span>
  </div>
);

const LoaderPage: React.FC = () => {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [overlayDemo,    setOverlayDemo]    = useState(false);

  const sizes:    LoaderSize[]    = ["xs", "sm", "md", "lg", "xl"];
  const variants: LoaderVariant[] = ["spinner", "dots", "bar", "pulse"];

  return (
    <div className="py-7 px-8 max-w-[900px] mx-auto">


      <Section title="Variants">
        <div className="flex gap-4 flex-wrap">
          {variants.map((v) => (
            <Card key={v} label={v}>
              <Loader variant={v} size="md" />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Sizes (Spinner)">
        <div className="flex gap-4 flex-wrap items-end">
          {sizes.map((s) => (
            <Card key={s} label={s}>
              <Loader variant="spinner" size={s} />
            </Card>
          ))}
        </div>
      </Section>

      <Section title="With Label">
        <div className="flex gap-4 flex-wrap">
          <Card label="spinner + label">
            <Loader variant="spinner" size="md" label="Loading data..." />
          </Card>
          <Card label="dots + label">
            <Loader variant="dots" size="md" label="Processing..." />
          </Card>
          <Card label="bar + label">
            <Loader variant="bar" size="md" label="Uploading..." />
          </Card>
        </div>
      </Section>

      <Section title="Inline Usage">
        <div className="flex flex-col gap-3">

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0073bb] text-white border-none rounded-[6px] px-4 py-2 text-[13px] cursor-not-allowed opacity-85">
              <Loader variant="spinner" size="xs" />
              Saving...
            </button>
            <span className="text-xs text-[#6b7280]">Loader inside a button</span>
          </div>

          <div className="flex items-center gap-2">
            <Loader variant="dots" size="xs" />
            <span className="text-[13px] text-[#9ca3af]">Fetching tenant list</span>
          </div>

        </div>
      </Section>

      <Section title="Overlay (relative container)">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative w-60 h-[120px] bg-[#111827] border border-[#2d3748] rounded-[10px] flex items-center justify-center">
            <span className="text-[13px] text-[#4b5563]">Content underneath</span>
            {overlayDemo && (
              <Loader variant="spinner" size="md" label="Loading..." overlay />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setOverlayDemo((v) => !v)}
              className={`${overlayDemo ? "bg-[#374151]" : "bg-[#0073bb]"} text-white border-none rounded-[6px] px-4 py-2 text-[13px] cursor-pointer`}
            >
              {overlayDemo ? "Hide Overlay" : "Show Overlay"}
            </button>
            <span className="text-xs text-[#6b7280]">
              Use <code className="text-[#3b9dd2]">overlay</code> prop on a relative container
            </span>
          </div>
        </div>
      </Section>

      <Section title="Fullscreen (API call simulation)">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setFullscreenOpen(true);
              setTimeout(() => setFullscreenOpen(false), 2500);
            }}
            className="bg-[#0073bb] text-white border-none rounded-[6px] px-5 py-2 text-[13px] cursor-pointer"
          >
            Trigger Fullscreen (2.5s)
          </button>
          <span className="text-xs text-[#6b7280]">Simulates a page-blocking API call</span>
        </div>
      </Section>

      {fullscreenOpen && (
        <Loader variant="spinner" size="lg" label="Please wait..." fullscreen />
      )}


    </div>
  );
};

export default LoaderPage;