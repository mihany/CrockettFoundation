import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
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
      description: "Becomes the page address: /events/<slug>. Click Generate; avoid changing it after publishing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "One or two sentences, shown on event cards and in search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 8,
      description: "Full details. Leave a blank line between paragraphs.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      type: "date",
      description: "Leave empty for single-day events.",
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = (context.document as { startDate?: string } | undefined)?.startDate;
          if (endDate && startDate && endDate < startDate) {
            return "The end date can't be before the start date.";
          }
          return true;
        }),
    }),
    defineField({
      name: "location",
      type: "string",
      description: 'Leave empty and the site shows "Location to be announced".',
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration link",
      type: "url",
      description: "Leave empty until registration opens.",
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
  ],
  orderings: [
    {
      title: "Start date, newest first",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "startDate", media: "image" },
    prepare: ({ title, date, media }) => ({ title, subtitle: date, media }),
  },
});
