import { ReactElement } from "react";

interface Props {
  className?: string;
  isSmall?: boolean;
}

export function ReCaptchaTerms({ className, isSmall }: Props): ReactElement {
  return (
    <div
      className={`text-xs text-white mt-5 ${className}`}
      style={{ fontSize: isSmall ? "0.6rem" : "" }}
    >
      <span>
        Chránené testom <strong>reCAPTCHA</strong>
      </span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a
        href="https://www.google.com/intl/sk/policies/privacy/"
        target="_blank"
      >
        Ochrana súkromia
      </a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a href="https://www.google.com/intl/sk/policies/terms/" target="_blank">
        Zmluvné podmienky
      </a>
    </div>
  );
}
