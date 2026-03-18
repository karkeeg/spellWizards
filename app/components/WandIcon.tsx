import Image from "next/image";
import React from "react";

export const WandIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image
    src="/Vector.svg"
    alt="Wand Icon"
    width={32}
    height={32}
    className={className}
  />
);
