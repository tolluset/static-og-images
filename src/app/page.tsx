import { Metadata, ResolvingMetadata } from "next";
import path from "path";
import fs, { promises } from "fs";
import satori from "satori";
import { Transformer } from "@napi-rs/image";
import Image from "next/image";

export const dynamic = "force-static";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const fontPath = path.resolve("./src/fonts/NotoSansKR-Regular.ttf");
  const font = fs.readFileSync(fontPath);
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
        fontWeight: 600,
      }}
    >
      <div style={{ marginTop: 40 }}>빌드에들어가나</div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          name: "NotoSansKR-Regular",
          data: font,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const transformer = Transformer.fromSvg(svg);
  const png = await transformer.png();

  await promises.writeFile("./public/og.svg", svg);
  await promises.writeFile("./public/og.png", png);

  return {
    title: "OG Satori Example",
    description: "This is an example of using Satori to generate OG images 🐰",
    openGraph: {
      images: "./og.png",
    },
  };
}

// export const metadata: Metadata = {
//   title: "OG Satori Example",
//   description: "This is an example of using Satori to generate OG images 🐰",
//   openGraph: {
//     images: "./og.png",
//   },
// };

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      check out the og image 🐰
      <img src="./og.png" alt={"og.png"} />
      <hr />
      svg??? 🐰
      <Image src="./og.svg" alt={"og.svg"} />
    </main>
  );
}
