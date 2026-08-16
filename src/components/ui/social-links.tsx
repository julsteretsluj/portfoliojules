"use client";

import * as React from "react";
import {
  GlobeHemisphereEast,
  InstagramLogo,
  LinkedinLogo,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface Social {
  name: string;
  image?: string;
  href?: string;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
}

const ICONS: Record<string, Icon> = {
  LinkedIn: LinkedinLogo,
  Instagram: InstagramLogo,
  SEAMUNs: UsersThree,
  SEAMUN: GlobeHemisphereEast,
};

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  return (
    <div className={cn("social-links", className)} {...props}>
      {socials.map((social) => {
        const Icon = ICONS[social.name];

        return (
          <a
            key={social.name}
            className="social-link"
            href={social.href}
            target={social.href?.startsWith("http") ? "_blank" : undefined}
            rel={social.href?.startsWith("http") ? "noreferrer" : undefined}
          >
            {Icon ? (
              <Icon className="social-link-icon" size={22} weight="regular" aria-hidden />
            ) : null}
            <span>{social.name}</span>
          </a>
        );
      })}
    </div>
  );
}
