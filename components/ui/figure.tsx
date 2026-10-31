import { PhotoArt } from "./cover-art";

/** An image inside an essay: a halftone print that reveals the photo on hover. */
export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="mt-[30px]">
      <div className="relative h-[300px] overflow-hidden rounded-xl">
        <PhotoArt src={src} alt={alt} size="figure" />
      </div>
      <figcaption className="mt-2.5 font-mono text-xs leading-[18px] text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}
