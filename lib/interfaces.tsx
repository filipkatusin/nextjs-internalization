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

export interface Contact {
  title: string
  content: string
  form: Form
}

interface Form {
  name: string
  mail: string
  phone: string
  message: string
  text_button: string
}
