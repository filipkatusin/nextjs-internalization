import type { NextPage } from 'next'
import {useRouter} from "next/router";
import Link from "next/link";

const Home: NextPage = () => {
    const router = useRouter();

  return (
    <div>
        <h1>{router.locale == "sk" ? "slovencina": "cescina"}</h1>


        <Link href={"/"} locale={"sk"}>
            <a>
                slovencina
            </a>
        </Link>


        <br/>
        <br/>
        <br/>

        <Link href={"/"} locale={"cs"}>
            <a>
                cescina
            </a>
        </Link>
    </div>
  )
}

export default Home
