import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Authenticated, Unauthenticated } from 'convex/react'

const features = [
  {
    title: "Recipe Books",
    description: "Organize your recipes into beautiful collections. Create cookbooks for every occasion.",
    icon: "📚",
  },
  {
    title: "Easy Sharing",
    description: "Share your favorite recipes with friends and family with just a click.",
    icon: "🔗",
  },
  {
    title: "Smart Search",
    description: "Find recipes by ingredients, cuisine, or cooking time. Never wonder what to cook again.",
    icon: "🔍",
  },
  {
    title: "Step-by-Step",
    description: "Follow clear instructions with timers and tips to nail every dish.",
    icon: "👨‍🍳",
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 animate-float" />
          <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-white/10 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-20 right-1/4 w-40 h-40 rounded-full bg-white/10 animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍳</span>
            <span className="text-xl font-bold text-white">RecipeBox</span>
          </div>
          <div className="flex items-center gap-3">
            <Unauthenticated>
              <SignInButton>
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton>
                <Button className="bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <UserButton />
            </Authenticated>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight animate-fade-in">
            Your Recipes,{" "}
            <span className="text-accent">Beautifully Organized</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl animate-slide-up">
            Create, organize, and share your favorite recipes. Build your personal cookbook 
            and never lose a cherished family recipe again.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 text-base font-semibold">
              Start Cooking Free
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 text-base">
              See How It Works
            </Button>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="var(--color-background)"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to Cook Amazing Meals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From planning to plating, we've got the tools to make your culinary journey delightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="hover-lift border-0 shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your Cooking?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of home cooks who have already discovered a better way to organize their recipes.
          </p>
          <div className="mt-8">
            <Button size="lg" className="px-10 text-base font-semibold">
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="font-semibold text-foreground">RecipeBox</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 RecipeBox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
