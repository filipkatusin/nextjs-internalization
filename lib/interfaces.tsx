export interface StrapiImage {
  url: string;
  formats: Formats;
}

interface Formats {
  thumbnail: Format;
  large: Format;
  medium: Format;
  small: Format;
}

interface Format {
  url: string;
}
