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
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  initials: string;
  avatarBg: string;
  content: string;
}

const testimonials1: Testimonial[] = [
  {
    name: "Maria G.",
    role: "Houston, TX",
    initials: "MG",
    avatarBg: "bg-brand",
    content:
      "I had no idea I qualified for SNAP and LIHEAP. Benefind found $340 a month in benefits I was missing.",
  },
  {
    name: "James T.",
    role: "Detroit, MI",
    initials: "JT",
    avatarBg: "bg-sky-500",
    content:
      "The whole process took 5 minutes. I applied for heating assistance the same day.",
  },
  {
    name: "Sarah L.",
    role: "Phoenix, AZ",
    initials: "SL",
    avatarBg: "bg-purple-500",
    content:
      "As a single mom, navigating government programs felt impossible. Benefind made it simple.",
  },
  {
    name: "TechStart Inc.",
    role: "Austin, TX",
    initials: "TS",
    avatarBg: "bg-amber-500",
    content:
      "We discovered $150K in SBIR funding we didn\u2019t know we were eligible for.",
  },
  {
    name: "GreenBuild Co.",
    role: "Portland, OR",
    initials: "GB",
    avatarBg: "bg-rose-500",
    content:
      "The clean energy credits alone saved us $45K. Worth every minute of the screening.",
  },
  {
    name: "David K.",
    role: "Miami, FL",
    initials: "DK",
    avatarBg: "bg-violet-500",
    content:
      "I was skeptical about a free tool, but it found $8,200 in annual benefits. Incredible.",
  },
];

const testimonials2: Testimonial[] = [
  {
    name: "Aisha R.",
    role: "Brooklyn, NY",
    initials: "AR",
    avatarBg: "bg-emerald-500",
    content:
      "The Arabic translation made all the difference for my mother. She finally got the WIC support she qualified for.",
  },
  {
    name: "BrightWorks Labs",
    role: "Cambridge, MA",
    initials: "BW",
    avatarBg: "bg-indigo-500",
    content:
      "The R&D Tax Credit walkthrough alone paid for our entire next hire. We had no idea we qualified.",
  },
  {
    name: "Linda H.",
    role: "Cleveland, OH",
    initials: "LH",
    avatarBg: "bg-pink-500",
    content:
      "After my husband passed, I felt lost. Benefind found three programs I qualified for in one sitting.",
  },
  {
    name: "Northstar Farm Co.",
    role: "Bismarck, ND",
    initials: "NF",
    avatarBg: "bg-teal-500",
    content:
      "USDA Rural grants. WOTC. Workforce training credits. All in one screening, all in plain English.",
  },
  {
    name: "Kenji M.",
    role: "Seattle, WA",
    initials: "KM",
    avatarBg: "bg-orange-500",
    content:
      "I usually distrust anything government-adjacent. The on-device privacy made me trust the screening.",
  },
  {
    name: "Lupita V.",
    role: "Albuquerque, NM",
    initials: "LV",
    avatarBg: "bg-cyan-500",
    content:
      "Lo hice todo en español. Encontré CHIP para mis hijos y SNAP para nuestra familia. Gracias.",
  },
];

interface Testimonial7Props {
  className?: string;
}

const Testimonial7 = ({ className }: Testimonial7Props) => {
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

  const renderRow = (rows: Testimonial[], plugin: typeof plugin1) => (
    <Carousel
      opts={{ loop: true, align: "start", dragFree: true }}
      plugins={[plugin.current]}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="-ml-4">
        {[...rows, ...rows].map((testimonial, index) => (
          <CarouselItem
            key={index}
            className="flex basis-auto py-px pl-4"
          >
            <Card
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
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-text-subtle">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  return (
    <section className={cn("w-full bg-surface py-24 sm:py-28", className)}>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6">
        <Badge variant="brand">Testimonials</Badge>
        <h2 className="text-center font-display text-3xl font-semibold text-text sm:text-4xl lg:text-5xl">
          Real money. Real people. Real businesses.
        </h2>
        <p className="text-center text-base text-text-muted lg:text-lg">
          From single parents to startups to family farms — Benefind finds the
          benefits, grants, and credits people miss.
        </p>
      </div>

      {/* Full-bleed carousels with edge fade mask */}
      <div className="mt-16 space-y-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {renderRow(testimonials1, plugin1)}
        {renderRow(testimonials2, plugin2)}
      </div>
    </section>
  );
};

export { Testimonial7 };
