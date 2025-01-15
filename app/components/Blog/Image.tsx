interface ImageProps {
  imageUrl: string;
  altText: string;
}

export default function Image({ imageUrl, altText }: ImageProps) {
  return (
    <img
      src={imageUrl}
      alt={altText}
      className="aspect-video rounded-sm object-cover"
    />
  );
}
