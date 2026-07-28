import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type LazyImageProps = {
  src: string | null;
  alt: string;
  placeholder?: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder,
  className,
  width = 100,
  height = 100,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImageLoaded(true);
        setImageSrc(src);
      };
    }
  }, [src]);

  return (
    <>
      {imageLoaded && imageSrc ? (
        <img
          width={width}
          height={height}
          src={imageSrc}
          alt={alt}
          className={cn(className)}
        />
      ) : (
        placeholder || <div>Loading...</div>
      )}
    </>
  );
};

export default LazyImage;
