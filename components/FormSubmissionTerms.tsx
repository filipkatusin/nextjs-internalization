import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {
  className?: string;
  isSmall?: boolean;
}

export function FormSubmissionTerms({
  className,
  isSmall,
}: Props): ReactElement {
  return (
    <div className={`text-xs text-white ${className}`}>
      <Link href="/podmienky">
        <a
          style={{
            fontSize: isSmall ? "0.6rem" : "",
            lineHeight: isSmall ? "0.8rem" : "",
          }}
          target="_blank"
        >
          Odoslaním kontaktných údajov vyjadrujem súhlas so spracovaním týchto
          údajov za účelom oslovenia s ponukou na uzatvorenie finančných
          produktov v súlade so zákonom č. 122/2013 Z.z. o ochrane osobných
          údajov v znení neskorších predpisov.
        </a>
      </Link>
    </div>
  );
}
