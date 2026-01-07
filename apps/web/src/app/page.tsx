import { FancyButton } from "@/components/ui/fancy-button";
import {
  GradientCard,
  GradientCardHeader,
  GradientCardTitle,
  GradientCardDescription,
  GradientCardContent,
  GradientCardFooter,
} from "@/components/ui/gradient-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Sparkles, Zap, Rocket, Heart, Github } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header with GitHub Link */}
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h2 className="font-bold text-lg">shadcn Registry</h2>
          <a
            href="https://github.com/albinotonnina/shadcn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Github size={20} />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Custom Registry Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This demo showcases custom shadcn/ui components served from a local
            registry server. Pull these into any project!
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
              Registry: localhost:3001
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
              App: localhost:3000
            </span>
          </div>
        </div>

        {/* Animated Counters Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Animated Counter Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GradientCard gradient="ocean" hover="scale">
              <div className="text-center">
                <AnimatedCounter
                  value={12500}
                  duration={2000}
                  prefix="$"
                  className="text-3xl"
                />
                <p className="text-sm text-muted-foreground mt-2">Revenue</p>
              </div>
            </GradientCard>
            <GradientCard gradient="sunset" hover="scale">
              <div className="text-center">
                <AnimatedCounter
                  value={98.5}
                  duration={1500}
                  suffix="%"
                  decimals={1}
                  className="text-3xl"
                />
                <p className="text-sm text-muted-foreground mt-2">Uptime</p>
              </div>
            </GradientCard>
            <GradientCard gradient="forest" hover="scale">
              <div className="text-center">
                <AnimatedCounter
                  value={4280}
                  duration={2500}
                  easing="spring"
                  className="text-3xl"
                />
                <p className="text-sm text-muted-foreground mt-2">Users</p>
              </div>
            </GradientCard>
            <GradientCard gradient="fire" hover="scale">
              <div className="text-center">
                <AnimatedCounter
                  value={156}
                  duration={1800}
                  suffix="+"
                  easing="easeInOut"
                  className="text-3xl"
                />
                <p className="text-sm text-muted-foreground mt-2">Countries</p>
              </div>
            </GradientCard>
          </div>
        </div>

        {/* Fancy Buttons Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Fancy Button Component
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <FancyButton variant="gradient" leftIcon={<Sparkles size={18} />}>
              Gradient
            </FancyButton>
            <FancyButton variant="ocean" leftIcon={<Zap size={18} />}>
              Ocean
            </FancyButton>
            <FancyButton variant="sunset" leftIcon={<Rocket size={18} />}>
              Sunset
            </FancyButton>
            <FancyButton variant="forest" leftIcon={<Heart size={18} />}>
              Forest
            </FancyButton>
            <FancyButton variant="neon">Neon</FancyButton>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <FancyButton variant="gradient" size="sm">
              Small
            </FancyButton>
            <FancyButton variant="gradient" size="md">
              Medium
            </FancyButton>
            <FancyButton variant="gradient" size="lg">
              Large
            </FancyButton>
            <FancyButton variant="gradient" size="xl">
              Extra Large
            </FancyButton>
          </div>
          <div className="flex justify-center mt-6">
            <FancyButton variant="ocean" isLoading>
              Loading State
            </FancyButton>
          </div>
        </div>

        {/* Gradient Cards Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Gradient Card Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GradientCard gradient="rainbow" animated hover="both">
              <GradientCardHeader>
                <GradientCardTitle>Rainbow Card</GradientCardTitle>
                <GradientCardDescription>
                  Animated gradient border with hover effects
                </GradientCardDescription>
              </GradientCardHeader>
              <GradientCardContent>
                <p className="text-sm">
                  This card features an animated rainbow gradient border that
                  continuously moves, creating an eye-catching effect.
                </p>
              </GradientCardContent>
              <GradientCardFooter>
                <FancyButton variant="gradient" size="sm">
                  Learn More
                </FancyButton>
              </GradientCardFooter>
            </GradientCard>

            <GradientCard gradient="aurora" hover="glow">
              <GradientCardHeader>
                <GradientCardTitle>Aurora Card</GradientCardTitle>
                <GradientCardDescription>
                  Northern lights inspired gradient
                </GradientCardDescription>
              </GradientCardHeader>
              <GradientCardContent>
                <p className="text-sm">
                  Inspired by the Aurora Borealis, this card brings the magic of
                  the northern lights to your UI.
                </p>
              </GradientCardContent>
              <GradientCardFooter>
                <FancyButton variant="forest" size="sm">
                  Explore
                </FancyButton>
              </GradientCardFooter>
            </GradientCard>

            <GradientCard gradient="fire" animated hover="scale">
              <GradientCardHeader>
                <GradientCardTitle>Fire Card</GradientCardTitle>
                <GradientCardDescription>
                  Warm, energetic gradient animation
                </GradientCardDescription>
              </GradientCardHeader>
              <GradientCardContent>
                <p className="text-sm">
                  A fiery gradient that adds warmth and energy to your design,
                  perfect for call-to-action sections.
                </p>
              </GradientCardContent>
              <GradientCardFooter>
                <FancyButton variant="sunset" size="sm">
                  Get Started
                </FancyButton>
              </GradientCardFooter>
            </GradientCard>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="max-w-3xl mx-auto">
          <GradientCard gradient="ocean">
            <GradientCardHeader>
              <GradientCardTitle>How to Add Custom Components</GradientCardTitle>
              <GradientCardDescription>
                Pull components from the custom registry into your project
              </GradientCardDescription>
            </GradientCardHeader>
            <GradientCardContent>
              <div className="space-y-4 font-mono text-sm">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                  <p className="text-slate-400 mb-2"># Add a component from the custom registry</p>
                  <p>npx shadcn@latest add custom/fancy-button</p>
                </div>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                  <p className="text-slate-400 mb-2"># Add multiple components</p>
                  <p>npx shadcn@latest add custom/gradient-card custom/animated-counter</p>
                </div>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                  <p className="text-slate-400 mb-2"># List available components</p>
                  <p>curl http://localhost:3001/r/index.json</p>
                </div>
              </div>
            </GradientCardContent>
          </GradientCard>
        </div>
      </section>
    </main>
  );
}
