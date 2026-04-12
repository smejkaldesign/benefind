import { ImageResponse } from "next/og";
import { posts } from "@/lib/blog";

export const alt = "Blog post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug && p.published);

  const title = post?.title ?? "Benefind Blog";
  const tag = post?.tags?.[0] ?? "";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        backgroundColor: "#121212",
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top: logo + tag */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#cab1f7",
            letterSpacing: "-0.02em",
          }}
        >
          Benefind
        </div>
        {tag && (
          <div
            style={{
              fontSize: 18,
              color: "#a0a0a0",
              backgroundColor: "#1e1e1e",
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid #2a2a2a",
            }}
          >
            {tag}
          </div>
        )}
      </div>

      {/* Center: title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom: URL + accent line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 20, color: "#666666" }}>benefind.app</div>
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "#cab1f7",
            borderRadius: 2,
          }}
        />
      </div>
    </div>,
    { ...size },
  );
}
