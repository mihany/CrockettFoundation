import { ImageResponse } from "next/og";

// The default share card (Facebook, LinkedIn, X, iMessage, Slack, and the
// image search engines attach to the Organization). Rendered once at build
// time. It is a plain route rather than an `opengraph-image` file because
// file-based images override every page's metadata — events and programs
// with their own photo must be able to replace it.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f3e8",
          borderBottom: "16px solid #c9a227",
        }}
      >
        <div style={{ fontSize: 34, color: "#7a5c15", letterSpacing: 1 }}>
          The Crockett Foundation
        </div>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.08,
            color: "#1c1a14",
            maxWidth: 960,
            fontFamily: "serif",
          }}
        >
          Cost should never be the reason a student stays home.
        </div>
        <div style={{ fontSize: 30, color: "#5a5449" }}>
          Study abroad scholarships for underserved high school and college students
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
