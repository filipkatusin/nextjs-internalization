import React, { ReactElement } from "react";
import Container from "./Container";

function cookies() {
  // @ts-ignore
  window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open");
}

export default function Footer(): ReactElement {
  return (
    <footer className="bg-accent-1 dark:bg-white dark:text-white border-t border-accent-2 dark:border-gray-600">
      <Container withoutTopMargin={true}>
        <div className="flex flex-1 justify-center">
          <a
            className="cursor-pointer  items-center mt-10 font-bold"
            onClick={() => cookies()}
          >
            Nastavenia súborov Cookies
          </a>
        </div>
      </Container>
    </footer>
  );
}
