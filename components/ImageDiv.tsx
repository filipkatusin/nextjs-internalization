import { getStrapiUrl } from "@/lib/get-strapi-url";

interface Props {
  imageUrl: string;
  className?: string;
  link?: string;
}

export default function ImageDiv({ imageUrl, className, link }: Props) {
  console.log();
  if (link) {
    return (
      <a
        href={link ?? ""}
        target={"_blank"}
        className={`background-image transform transition-transform hover:scale-105 ${className}`}
        style={{
          backgroundImage: `url(${
            imageUrl
              ? getStrapiUrl(imageUrl)
              : "/assets/no-image-background.png"
          })`,
        }}
      ></a>
    );
  }

  return (
    <div
      className={`background-image ${className}`}
      style={{
        backgroundImage: `url(${
          imageUrl ? getStrapiUrl(imageUrl) : "/assets/no-image-background.png"
        })`,
      }}
    ></div>
  );
}
