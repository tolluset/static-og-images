import { Metadata } from "next";
import path from "path";
import fs from "fs";
import satori from "satori";
import Head from "next/head";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "OG Satori Example",
  description: "This is an example of using Satori to generate OG images",
};
// const m = await fetch(new URL("./Mooli-Regular.ttf", import.meta.url)).then(
//   (r) => r.arrayBuffer()
// );

export default async function Home() {
  const fontPath = path.resolve("./src/fonts/Mooli-Regular.ttf");

  console.log("🚀 ~ __dirname:", __dirname);
  const m = fs.readFileSync(fontPath);

  console.log("🚀 ~ m:", m);
  const ogImg = await satori(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #dbf4ff, #fff1f1)",
        fontSize: 60,
        letterSpacing: -2,
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Make OG Image
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        In
      </div>
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(255, 77, 77), rgb(249, 203, 40))",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Build time
      </div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: "Mooli",
          data: m,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  console.log("🚀 ~ ogImg:", ogImg);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <meta property="og:image" content={ogImg} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: ogImg }}></div>
    </main>
  );
}
