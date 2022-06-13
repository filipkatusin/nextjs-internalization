import { Menu } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMenu } from "@/lib/api";

export default function TopMenu() {
  const [menu, setMenu] = useState<Menu[]>([]);

  const getEvents = async () => {
    const menuData = await getMenu();
    setMenu(menuData);
  };

  useEffect(() => {
    getEvents().then();
  }, []);

  return (
    <div>
      {menu?.map((m) => (
        <Link href={m.path}>
          <a>{m.title}</a>
        </Link>
      ))}
    </div>
  );
}
