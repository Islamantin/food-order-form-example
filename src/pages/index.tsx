import Head from "next/head";
import FormBase from "src/components/formBase";

export default function Home() {
  return (
    <>
      <Head>
        <title>Food Order</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-60">
        <FormBase />
      </main>
    </>
  );
}
