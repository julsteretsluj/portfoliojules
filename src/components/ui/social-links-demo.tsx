import { SocialLinks } from "@/components/ui/social-links";
import { socials } from "@/data";

function SocialLinksDemo() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <SocialLinks socials={socials} />
    </main>
  );
}

function SocialLinksCustomGap() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center px-4 py-10 md:items-center">
      <SocialLinks socials={socials.slice(0, 2)} className="gap-4" />
    </main>
  );
}

export default {
  SocialLinksDemo,
  SocialLinksCustomGap,
};
