import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import PhotoPlaceholder from "./PhotoPlaceholder";

type Props = {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
  priority?: boolean;
};

export default function SmartImage({ src, alt, fallbackLabel, className = "", priority }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  if (!exists) {
    return <PhotoPlaceholder label={fallbackLabel} className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
