import Link from "next/link";
import { menu } from "@/src/data/menu";

export default function TopMenu() {
  return (
    menu && (
      <div>
        {menu?.map((m, index) => (
          <Link key={index} href={m.path}>
            <a>{m.title}</a>
          </Link>
        ))}
      </div>
    )
  );
}
