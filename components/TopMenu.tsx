import { Menu } from "@/lib/interfaces";
import Link from "next/link";

interface Props {
  menu: Menu[];
}

export default function TopMenu({ menu }: Props) {
  return (
    <div>
      {menu.map((m) => (
        <Link href={m.path}>
          <a>{m.title}</a>
        </Link>
      ))}
    </div>
  );
}
