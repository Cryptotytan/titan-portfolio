import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Starfield } from "@/components/starfield";
import { Hero } from "@/components/sections/hero";
import { Signals } from "@/components/sections/signals";
import { Work } from "@/components/sections/work";
import { Videos } from "@/components/sections/videos";
import { Articles } from "@/components/sections/articles";
import { Practice } from "@/components/sections/practice";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/site-footer";
import { LaunchProvider } from "@/components/launch-provider";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <LaunchProvider>
      <Starfield />
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main id="main" className="relative z-10">
        <Hero />
        <Signals />
        <Work />
        <Videos />
        <Articles />
        <Practice />
        <Experience />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </LaunchProvider>
  );
}
