import React from "react";
import { Metadata } from "next";
import { Provider } from "jotai";
import { getTranslations } from "next-intl/server";
import "@root/src/styles/globals.scss";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");
  const img = "/icon.svg";

  return {
    title,
    description,
    keywords: t("keywords").split(" "),
    authors: [{ name: "Vitalii Popov", url: "@mskKote" }],
    metadataBase: new URL("https://effects.vercel.app/"),
    icons: img,
    twitter: {
      title,
      description,
      card: "summary",
      site: "effects",
      images: img,
    },
    openGraph: {
      locale,
      title,
      description,
      type: "website",
      siteName: "effects",
      images: img,
      url: new URL("https://effects.vercel.app/"),
    },
    verification: {
      google: "ESsLs9SC3UTPFCeFmLcLnyTUDV77zgLvHzcOUSwyInc",
    },
  };
}

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
