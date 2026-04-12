import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";

export const metadata: Metadata = {
  title: "Components | Design System | Benefind Docs",
  description:
    "Component library reference for Benefind. shadcn/ui primitives, custom visual effects, usage examples, and import paths.",
  alternates: {
    canonical: "https://benefind.app/docs/design-system/components",
  },
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ComponentEntry {
  name: string;
  description: string;
  importPath: string;
  usage: string;
}

interface ComponentCategory {
  title: string;
  components: ComponentEntry[];
}

interface ReactbitsEntry {
  name: string;
  description: string;
  importPath: string;
  usedIn: string;
  usage: string;
}

/* ------------------------------------------------------------------ */
/*  Component registry                                                 */
/* ------------------------------------------------------------------ */

const CATEGORIES: ComponentCategory[] = [
  {
    title: "Forms & Inputs",
    components: [
      {
        name: "Button",
        description:
          "Primary interactive element. Supports variants (default, outline, secondary, ghost, destructive, link) and sizes (xs, sm, default, lg).",
        importPath: '@/components/ui/button',
        usage: `<Button variant="default" size="default">
  Click me
</Button>`,
      },
      {
        name: "Input",
        description:
          "Single-line text input with consistent border, focus ring, and placeholder styling.",
        importPath: '@/components/ui/input',
        usage: `<Input type="email" placeholder="you@example.com" />`,
      },
      {
        name: "Textarea",
        description: "Multi-line text input for longer form content.",
        importPath: '@/components/ui/textarea',
        usage: `<Textarea placeholder="Tell us more..." rows={4} />`,
      },
      {
        name: "Select",
        description:
          "Dropdown select built on Radix. Includes trigger, content, item, and group sub-components.",
        importPath: '@/components/ui/select',
        usage: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`,
      },
      {
        name: "Checkbox",
        description:
          "Toggle checkbox with optional label. Radix-based with accessible focus states.",
        importPath: '@/components/ui/checkbox',
        usage: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`,
      },
      {
        name: "Radio Group",
        description:
          "Mutually exclusive option group. Renders as fieldset with individual radio items.",
        importPath: '@/components/ui/radio-group',
        usage: `<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" id="a" />
  <Label htmlFor="a">Option A</Label>
  <RadioGroupItem value="b" id="b" />
  <Label htmlFor="b">Option B</Label>
</RadioGroup>`,
      },
      {
        name: "Switch",
        description:
          "Toggle switch for binary settings. Animated thumb with brand color active state.",
        importPath: '@/components/ui/switch',
        usage: `<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>`,
      },
      {
        name: "Slider",
        description:
          "Range input for numeric values. Supports min, max, step, and default value.",
        importPath: '@/components/ui/slider',
        usage: `<Slider defaultValue={[50]} max={100} step={1} />`,
      },
      {
        name: "Toggle",
        description:
          "Pressable toggle button with outline and default variants.",
        importPath: '@/components/ui/toggle',
        usage: `<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>`,
      },
      {
        name: "Toggle Group",
        description:
          "Group of toggles that can operate as single-select or multi-select.",
        importPath: '@/components/ui/toggle-group',
        usage: `<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,
      },
      {
        name: "Label",
        description:
          "Accessible form label. Pairs with inputs, checkboxes, and switches via htmlFor.",
        importPath: '@/components/ui/label',
        usage: `<Label htmlFor="email">Email address</Label>`,
      },
      {
        name: "Command",
        description:
          "Command palette / searchable list. Composable with CommandInput, CommandList, CommandGroup, CommandItem.",
        importPath: '@/components/ui/command',
        usage: `<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandGroup heading="Actions">
      <CommandItem>Search benefits</CommandItem>
      <CommandItem>View profile</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
      },
    ],
  },
  {
    title: "Layout",
    components: [
      {
        name: "Card",
        description:
          "Surface container with header, content, and footer slots. Uses surface-dim background with subtle border.",
        importPath: '@/components/ui/card',
        usage: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card body content</p>
  </CardContent>
</Card>`,
      },
      {
        name: "Separator",
        description:
          "Horizontal or vertical visual divider using the border color token.",
        importPath: '@/components/ui/separator',
        usage: `<Separator orientation="horizontal" />`,
      },
      {
        name: "Scroll Area",
        description:
          "Custom scrollbar container. Wraps content with a styled scrollbar track and thumb.",
        importPath: '@/components/ui/scroll-area',
        usage: `<ScrollArea className="h-72 w-full rounded-md border">
  <div className="p-4">{/* long content */}</div>
</ScrollArea>`,
      },
      {
        name: "Resizable",
        description:
          "Drag-to-resize panels. Horizontal or vertical groups with configurable min/max sizes.",
        importPath: '@/components/ui/resizable',
        usage: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Left</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Right</ResizablePanel>
</ResizablePanelGroup>`,
      },
      {
        name: "Accordion",
        description:
          "Expandable content sections. Single or multiple items can be open simultaneously.",
        importPath: '@/components/ui/accordion',
        usage: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
      {
        name: "Collapsible",
        description:
          "Simple show/hide toggle for a content region. Lighter than accordion for single sections.",
        importPath: '@/components/ui/collapsible',
        usage: `<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`,
      },
      {
        name: "Tabs",
        description:
          "Tabbed interface with trigger list and content panels. Keyboard-navigable.",
        importPath: '@/components/ui/tabs',
        usage: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="details">Details content</TabsContent>
</Tabs>`,
      },
    ],
  },
  {
    title: "Navigation",
    components: [
      {
        name: "Breadcrumb",
        description:
          "Hierarchical page location indicator. Composable with BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator.",
        importPath: '@/components/ui/breadcrumb',
        usage: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
      {
        name: "Navigation Menu",
        description:
          "Top-level site navigation with dropdown support. Animated indicator and viewport.",
        importPath: '@/components/ui/navigation-menu',
        usage: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/features">
          View all
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
      },
      {
        name: "Dropdown Menu",
        description:
          "Context-action menu triggered by a button. Supports items, sub-menus, checkboxes, radio items, and separators.",
        importPath: '@/components/ui/dropdown-menu',
        usage: `<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
      {
        name: "Context Menu",
        description:
          "Right-click context menu. Same API shape as Dropdown Menu but triggered on contextmenu event.",
        importPath: '@/components/ui/context-menu',
        usage: `<ContextMenu>
  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
      },
      {
        name: "Menubar",
        description:
          "Desktop-style menu bar with multiple top-level triggers and nested menus.",
        importPath: '@/components/ui/menubar',
        usage: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New</MenubarItem>
      <MenubarItem>Open</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
      },
      {
        name: "Pagination",
        description:
          "Page navigation controls with previous, next, and numbered page links.",
        importPath: '@/components/ui/pagination',
        usage: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
      },
    ],
  },
  {
    title: "Overlays",
    components: [
      {
        name: "Dialog",
        description:
          "Modal dialog with overlay backdrop. Includes header, content, footer, and close button slots.",
        importPath: '@/components/ui/dialog',
        usage: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
      {
        name: "Drawer",
        description:
          "Bottom-sheet style overlay for mobile-friendly actions. Slides up from the bottom of the viewport.",
        importPath: '@/components/ui/drawer',
        usage: `<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer title</DrawerTitle>
    </DrawerHeader>
    <div className="p-4">Drawer body</div>
  </DrawerContent>
</Drawer>`,
      },
      {
        name: "Sheet",
        description:
          "Slide-out panel from any edge (top, right, bottom, left). Used for settings panels and filters.",
        importPath: '@/components/ui/sheet',
        usage: `<Sheet>
  <SheetTrigger asChild>
    <Button>Open sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    <div className="p-4">Panel content</div>
  </SheetContent>
</Sheet>`,
      },
      {
        name: "Popover",
        description:
          "Floating content panel anchored to a trigger element. Positioned automatically.",
        importPath: '@/components/ui/popover',
        usage: `<Popover>
  <PopoverTrigger asChild>
    <Button>Info</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Additional details here</p>
  </PopoverContent>
</Popover>`,
      },
      {
        name: "Tooltip",
        description:
          "Hover-triggered informational overlay. Short text, appears above/below the trigger.",
        importPath: '@/components/ui/tooltip',
        usage: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Helpful tip</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
      {
        name: "Hover Card",
        description:
          "Rich preview card shown on hover. Larger than a tooltip, supports complex content.",
        importPath: '@/components/ui/hover-card',
        usage: `<HoverCard>
  <HoverCardTrigger>@benefind</HoverCardTrigger>
  <HoverCardContent>
    <p>Benefind helps you find benefits.</p>
  </HoverCardContent>
</HoverCard>`,
      },
      {
        name: "Alert Dialog",
        description:
          "Confirmation dialog that requires explicit user action. Blocks interaction until resolved.",
        importPath: '@/components/ui/alert-dialog',
        usage: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
      },
    ],
  },
  {
    title: "Feedback",
    components: [
      {
        name: "Alert",
        description:
          "Inline notification banner with icon, title, and description. Supports default and destructive variants.",
        importPath: '@/components/ui/alert',
        usage: `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>
    Something you should know about.
  </AlertDescription>
</Alert>`,
      },
      {
        name: "Sonner (Toast)",
        description:
          "Toast notification system via the Sonner library. Call toast() to show non-blocking messages.",
        importPath: '@/components/ui/sonner',
        usage: `import { toast } from "sonner";

// Trigger from an event handler:
toast.success("Saved successfully");
toast.error("Something went wrong");`,
      },
      {
        name: "Progress",
        description:
          "Determinate progress bar. Pass a value (0-100) to indicate completion.",
        importPath: '@/components/ui/progress',
        usage: `<Progress value={66} className="w-full" />`,
      },
      {
        name: "Skeleton",
        description:
          "Placeholder loading animation. Mimics content shape while data loads.",
        importPath: '@/components/ui/skeleton',
        usage: `<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`,
      },
      {
        name: "Badge",
        description:
          "Inline label with variant colors (default, brand, success, warning, error).",
        importPath: '@/components/ui/badge',
        usage: `<Badge variant="brand">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>`,
      },
    ],
  },
  {
    title: "Data Display",
    components: [
      {
        name: "Table",
        description:
          "Structured data table with header, body, row, and cell sub-components.",
        importPath: '@/components/ui/table',
        usage: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>SNAP</TableCell>
      <TableCell>Eligible</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
      {
        name: "Avatar",
        description:
          "User avatar with image and fallback initials. Circular by default.",
        importPath: '@/components/ui/avatar',
        usage: `<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>ES</AvatarFallback>
</Avatar>`,
      },
      {
        name: "Carousel",
        description:
          "Swipeable content carousel with previous/next controls. Built on Embla.",
        importPath: '@/components/ui/carousel',
        usage: `<Carousel>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
      },
    ],
  },
];

const REACTBITS: ReactbitsEntry[] = [
  {
    name: "DitherFade",
    description:
      "Canvas-based dither/dissolve transition effect. Renders a pixelated fade pattern over a solid color for retro-futuristic backgrounds.",
    importPath: '@/components/dither-fade',
    usedIn: "Available for screening pages and section transitions. Not currently mounted in any page.",
    usage: `<DitherFade className="absolute inset-0" color="#121212" />`,
  },
  {
    name: "Grainient",
    description:
      "WebGL gradient with film grain overlay. Creates animated, noisy gradient backgrounds with configurable color stops.",
    importPath: '@/components/grainient',
    usedIn: "Landing page (src/app/page.tsx) as the hero section background.",
    usage: `<Grainient
  colors={["#0e0e0e", "#2d1b4e", "#1a0a2e"]}
  opacity={0.85}
  className="absolute inset-0"
/>`,
  },
  {
    name: "GradientBlinds",
    description:
      "Animated venetian-blind style gradient reveal. Horizontal slats that open to reveal a gradient beneath.",
    importPath: '@/components/gradient-blinds',
    usedIn: "Login page (src/app/auth/login/page.tsx) as the full-bleed background effect.",
    usage: `<GradientBlinds />`,
  },
  {
    name: "AsciiWaves",
    description:
      "Canvas-rendered ASCII art wave animation. Converts wave math into character grids for a terminal-aesthetic background.",
    importPath: '@/components/ascii-waves',
    usedIn: "Available as a decorative background. Not currently mounted in any page.",
    usage: `<AsciiWaves
  className="absolute inset-0"
  color="#cab1f7"
  fontSize={14}
/>`,
  },
  {
    name: "BorderGlow",
    description:
      "Animated glowing border effect with configurable color palette and intensity. Wraps child content with a pulsing gradient border.",
    importPath: '@/components/border-glow',
    usedIn: "Landing page stats strip and bento grid (src/components/landing/stats-strip.tsx, bento-grid.tsx).",
    usage: `<BorderGlow
  colors={["#cab1f7", "#deb0f7", "#b19eef"]}
  blur={12}
>
  <Card>Content with glowing border</Card>
</BorderGlow>`,
  },
  {
    name: "MagicBento",
    description:
      "CSS-driven responsive bento grid layout. Provides span classes for 2-col and 2-row items with animated transitions.",
    importPath: '@/components/magic-bento',
    usedIn: "Landing page bento grid (src/components/landing/bento-grid.tsx) as the grid layout system.",
    usage: `{/* Import the CSS */}
import "@/components/magic-bento.css";

<div className="magic-bento-grid">
  <div className="magic-bento-span-2-col">Wide item</div>
  <div>Normal item</div>
</div>`,
  },
  {
    name: "SmoothScroll",
    description:
      "Lenis-based smooth scroll provider. Wraps the page to replace native scroll with momentum-based smooth scrolling.",
    importPath: '@/components/smooth-scroll',
    usedIn: "Root layout (src/app/layout.tsx). Applied globally to all pages.",
    usage: `<SmoothScroll />`,
  },
];

/* ------------------------------------------------------------------ */
/*  Shared presentational helpers                                      */
/* ------------------------------------------------------------------ */

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      {eyebrow && (
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-brand">
          [{eyebrow}]
        </p>
      )}
      <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-surface-dark p-4 font-mono text-xs leading-relaxed text-text-muted">
      <code>{code}</code>
    </pre>
  );
}

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  return (
    <div className="rounded-xl border border-border bg-surface-dim p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-text">
          {entry.name}
        </h3>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-text-muted">
        {entry.description}
      </p>
      <p className="mb-4 font-mono text-[11px] text-text-subtle">
        {entry.importPath}
      </p>
      <CodeBlock code={entry.usage} />
    </div>
  );
}

function ReactbitsCard({ entry }: { entry: ReactbitsEntry }) {
  return (
    <div className="rounded-xl border border-brand/20 bg-surface-dim p-6">
      <h3 className="mb-1 font-display text-lg font-semibold text-text">
        {entry.name}
      </h3>
      <p className="mb-2 text-sm leading-relaxed text-text-muted">
        {entry.description}
      </p>
      <p className="mb-1 text-xs text-text-subtle">
        <span className="font-semibold text-text-muted">Used in:</span>{" "}
        {entry.usedIn}
      </p>
      <p className="mb-4 font-mono text-[11px] text-text-subtle">
        {entry.importPath}
      </p>
      <CodeBlock code={entry.usage} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ComponentsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Design system", href: "/docs/design-system" },
          { label: "Components" },
        ]}
      />

      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand">
          [Component Library]
        </p>
        <h1 className="mb-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
          Components
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          Every UI primitive available in Benefind. shadcn/ui components live in{" "}
          <code className="rounded bg-surface-dim px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
            src/components/ui/
          </code>
          . Custom visual effects (reactbits) live in{" "}
          <code className="rounded bg-surface-dim px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
            src/components/
          </code>
          .
        </p>
      </header>

      {/* Table of contents */}
      <Section title="Categories" eyebrow="Index">
        <div className="rounded-xl border border-border bg-surface-dim p-6">
          <ul className="columns-2 gap-6 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.title} className="mb-2">
                <a
                  href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="text-brand hover:text-brand-light"
                >
                  {cat.title}
                </a>
                <span className="ml-1 text-text-subtle">
                  ({cat.components.length})
                </span>
              </li>
            ))}
            <li className="mb-2">
              <a
                href="#visual-effects"
                className="text-brand hover:text-brand-light"
              >
                Visual Effects (reactbits)
              </a>
              <span className="ml-1 text-text-subtle">
                ({REACTBITS.length})
              </span>
            </li>
          </ul>
        </div>
      </Section>

      {/* shadcn/ui categories */}
      {CATEGORIES.map((cat) => (
        <Section
          key={cat.title}
          id={cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
          title={cat.title}
          eyebrow="shadcn/ui"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {cat.components.map((comp) => (
              <ComponentCard key={comp.name} entry={comp} />
            ))}
          </div>
        </Section>
      ))}

      {/* Reactbits / visual effects */}
      <Section
        id="visual-effects"
        title="Visual Effects (reactbits)"
        eyebrow="Custom"
      >
        <div className="mb-6 rounded-lg border border-brand/30 bg-brand/5 px-4 py-3">
          <p className="text-sm font-medium text-brand">
            These are custom visual effects built specifically for Benefind. Do
            not replace with shadcn/ui equivalents.
          </p>
          <p className="mt-1 text-xs text-text-muted">
            They use canvas, WebGL, or CSS animations for brand-specific
            backgrounds and transitions. Changing or removing them will break the
            visual identity.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {REACTBITS.map((entry) => (
            <ReactbitsCard key={entry.name} entry={entry} />
          ))}
        </div>
      </Section>
    </>
  );
}
