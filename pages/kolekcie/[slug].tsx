export default function KolekcieSlug() {
    return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}


export async function getStaticProps() {
    return {
        props: { },
    };
}


export async function getStaticPaths() {

    return {
        paths: [],
        fallback: true,
    };
}
