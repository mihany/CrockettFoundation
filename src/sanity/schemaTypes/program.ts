import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Becomes the page address: /programs/<slug>. Click Generate; avoid changing it after publishing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Scholarship", value: "scholarship" },
          { title: "Program", value: "program" },
        ],
        layout: "radio",
      },
      initialValue: "program",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Coming soon", value: "coming-soon" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "coming-soon",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Shown on program cards and in search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverage",
      title: "What it covers",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eligibility",
      title: "Who it's for",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Required materials",
      type: "array",
      of: [defineField({ name: "requirement", type: "string" })],
      description: 'One item per line. Leave empty and the site shows "Requirements will be announced closer to launch."',
    }),
    defineField({
      name: "note",
      type: "text",
      rows: 2,
      description: "Optional extra line shown under eligibility.",
    }),
    defineField({
      name: "pullQuote",
      type: "string",
      description: "Optional quote shown prominently on the program's page.",
    }),
    defineField({
      name: "deadline",
      type: "date",
      description: 'Leave empty and the site shows "Applications open soon".',
    }),
    defineField({
      name: "applyUrl",
      title: "Application link",
      type: "url",
      description: "Leave empty until applications exist.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "Shown at a 2:1 ratio. Use the crop and hotspot tools to choose what stays in frame.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describes the image for screen readers.",
          validation: (rule) =>
            rule.custom((alt, context) => {
              const image = (context.document as { image?: { asset?: unknown } } | undefined)?.image;
              return image?.asset && !alt ? "Add alternative text for the image." : true;
            }),
        }),
      ],
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first on the Programs page.",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", status: "status", media: "image" },
    prepare: ({ title, status, media }) => ({ title, subtitle: status, media }),
  },
});
