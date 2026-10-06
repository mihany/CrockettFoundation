import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

// The Studio is embedded in the Next.js app at /studio (see
// src/app/studio). Its base path must include the deploy base path, because
// the Studio reads window.location rather than going through Next's router.
export default defineConfig({
  name: "default",
  title: "Crockett Foundation",
  basePath: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/studio`,
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
