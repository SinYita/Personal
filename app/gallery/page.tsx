import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Weiyuan",
  description: "Photography gallery and image previews.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
