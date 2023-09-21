import { Metadata, ResolvingMetadata } from "next";
import path from "path";
import fs from "fs";
import satori from "satori";
import Head from "next/head";

const config = {};

export const dynamic = "force-static";

export async function generateMetadata(
  {},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const fontPath = path.resolve("./src/fonts/Mooli-Regular.ttf");
  const m = fs.readFileSync(fontPath);
  const ogImg = await satori(
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
      <div style={{ marginTop: 40 }}>빌드에들어가나 🐰</div>
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

  return {
    title: "OG Satori Example",
    description: "This is an example of using Satori to generate OG images 🐰",
    openGraph: {
      images: ogImg,
    },
  };
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      check out the og image 🐰
      <OG />
    </main>
  );
}

function OG() {
  return (
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
          // @ts-ignore
          "-webkit-background-clip": "text",
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
          // @ts-ignore
          "-webkit-background-clip": "text",
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
          // @ts-ignore
          "-webkit-background-clip": "text",
          color: "transparent",
        }}
      >
        Build time
      </div>
    </div>
  );
}
