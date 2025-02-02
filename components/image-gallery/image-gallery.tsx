import Image from "next/image";

export const ImageGallery = ({ urls }: { urls: string[] }) => (
  <>
    {urls.map((url, index) => {
      const offsetPercent = 100 / urls.length;
      return (
        <div
          key={url}
          style={{ left: `${index * offsetPercent}%` }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={url}
            alt={`Image ${index + 1}`}
            priority={index < 2}
            quality={50}
            fill
            sizes="33vw"
            className="object-cover rounded-xl"
          />
        </div>
      );
    })}
  </>
);
