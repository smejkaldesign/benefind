"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { useRef } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
}

const testimonials1: Testimonial[] = [
  {
    name: "Maria G.",
    role: "Houston, TX",
    initials: "MG",
    avatarBg: "bg-brand",
  },
  {
    name: "James T.",
    role: "Detroit, MI",
    initials: "JT",
    avatarBg: "bg-sky-500",
  },
  {
    name: "Sarah L.",
    role: "Phoenix, AZ",
    initials: "SL",
    avatarBg: "bg-purple-500",
  },
  {
    name: "TechStart Inc.",
    role: "Austin, TX",
    initials: "TS",
    avatarBg: "bg-amber-500",
  },
  {
    name: "GreenBuild Co.",
    role: "Portland, OR",
    initials: "GB",
    avatarBg: "bg-rose-500",
  },
  {
    name: "David K.",
    role: "Miami, FL",
    initials: "DK",
    avatarBg: "bg-violet-500",
  },
];

const testimonials2: Testimonial[] = [
  {
    name: "Aisha R.",
    role: "Brooklyn, NY",
    initials: "AR",
    avatarBg: "bg-emerald-500",
  },
  {
    name: "BrightWorks Labs",
    role: "Cambridge, MA",
    initials: "BW",
    avatarBg: "bg-indigo-500",
  },
  {
    name: "Linda H.",
    role: "Cleveland, OH",
    initials: "LH",
    avatarBg: "bg-pink-500",
  },
  {
    name: "Northstar Farm Co.",
    role: "Bismarck, ND",
    initials: "NF",
    avatarBg: "bg-teal-500",
  },
  {
    name: "Kenji M.",
    role: "Seattle, WA",
    initials: "KM",
    avatarBg: "bg-orange-500",
  },
  {
    name: "Lupita V.",
    role: "Albuquerque, NM",
    initials: "LV",
    avatarBg: "bg-cyan-500",
  },
];

interface Testimonial7Props {
  className?: string;
}

const Testimonial7 = ({ className }: Testimonial7Props) => {
  const { t, dir } = useI18n();
  const tt = t.marketing.testimonials;
  const plugin1 = useRef(
    AutoScroll({
      playOnInit: true,
      startDelay: 0,
      speed: 0.7,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }),
  );

  const plugin2 = useRef(
    AutoScroll({
      playOnInit: true,
      startDelay: 0,
      speed: 0.7,
      direction: "backward",
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }),
  );

  const renderRow = (
    people: Testimonial[],
    quotes: string[],
    plugin: typeof plugin1,
  ) => {
    const rows = people.map((person, i) => ({ ...person, content: quotes[i] }));
    return (
      <Carousel
        opts={{ loop: true, align: "start", dragFree: true }}
        plugins={[plugin.current]}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="-ml-4">
          {[...rows, ...rows].map((testimonial, index) => (
            <CarouselItem key={index} className="flex basis-auto py-px pl-4">
              <Card
                dir={dir}
                padding={false}
                className="flex h-full w-[360px] flex-col justify-between border-border bg-surface-bright p-6 select-none transition hover:border-accent/30"
              >
                <q className="text-sm leading-relaxed text-text-muted">
                  {testimonial.content}
                </q>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback
                      className={cn(
                        "text-xs font-bold text-white",
                        testimonial.avatarBg,
                      )}
                    >
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold text-text">
                      {testimonial.name}
                    </p>
                    <p className="text-text-subtle">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  };

  return (
    <section className={cn("w-full bg-surface py-24 sm:py-28", className)}>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6">
        <Badge variant="brand">{tt.badge}</Badge>
        <h2 className="text-center font-display text-3xl font-semibold text-text sm:text-4xl lg:text-5xl">
          {tt.title}
        </h2>
        <p className="text-center text-base text-text-muted lg:text-lg">
          {tt.subtitle}
        </p>
      </div>

      {/* Full-bleed carousels with edge fade mask */}
      <div
        dir="ltr"
        className="mt-16 space-y-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      >
        {renderRow(testimonials1, tt.row1, plugin1)}
        {renderRow(testimonials2, tt.row2, plugin2)}
      </div>
    </section>
  );
};

export { Testimonial7 };
