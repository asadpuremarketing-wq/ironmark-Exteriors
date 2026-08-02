"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function Logo({ className = "h-10" }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span className={`flex items-center gap-2 ${className}`}>
        <span className="font-heading text-lg font-extrabold tracking-tight text-white sm:text-xl">
          IRONMARK
        </span>
        <span className="font-heading text-lg font-light tracking-[0.15em] text-brand-blue-light sm:text-xl">
          EXTERIORS
        </span>
      </span>
    );
  }

  return (
    <Image
      src="/images/logo.png"
      alt="Ironmark Exteriors"
      width={373}
      height={100}
      priority
      onError={() => setErrored(true)}
      className={`w-auto object-contain ${className}`}
    />
  );
}
