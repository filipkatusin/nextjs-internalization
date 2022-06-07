import { useEffect, useState } from "react";
import useWindowDimensions from "@/components/useWindowDimensions";

export default function SlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState<number>(4);

  let windowWidth = 0;
  if (typeof window !== "undefined") {
    const size = useWindowDimensions();
    windowWidth = size.width;
  }

  function determineSlidesPerView() {
    if (600 > windowWidth) {
      setSlidesPerView(1);
    } else if (1000 > windowWidth) {
      setSlidesPerView(2);
    } else if (1300 > windowWidth) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4);
    }
  }

  useEffect(() => {
    determineSlidesPerView();
  }, [windowWidth]);

  return slidesPerView;
}
