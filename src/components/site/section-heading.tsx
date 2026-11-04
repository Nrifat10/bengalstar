"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "start";
  dark?: boolean;
  className?: string;
};

/** Consistent section header: gold eyebrow, bold title, muted subtext. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase",
            dark ? "text-gold-2" : "text-gold-3"
          )}
        >
          <span
            className={cn(
              "inline-block h-px w-8",
              dark ? "bg-gold-2/70" : "bg-gold/70"
            )}
            aria-hidden="true"
          />
          {eyebrow}
          {align === "center" && (
            <span
              className={cn(
                "inline-block h-px w-8",
                dark ? "bg-gold-2/70" : "bg-gold/70"
              )}
              aria-hidden="true"
            />
          )}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight sm:text-4xl",
          dark ? "text-white" : "text-brand"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
