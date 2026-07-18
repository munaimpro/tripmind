import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      {/* First image spans 2 columns and 2 rows on desktop */}
      <div className="md:col-span-2 md:row-span-2 relative h-64 md:h-[416px] rounded-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        <Image 
          src={images[0]} 
          alt="Gallery Image 1" 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Remaining images */}
      {images.slice(1, 5).map((img, index) => (
        <div key={index} className="relative h-48 md:h-[200px] rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <Image 
            src={img} 
            alt={`Gallery Image ${index + 2}`} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      ))}
    </div>
  );
}
