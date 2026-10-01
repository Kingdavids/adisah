import { ImageResponse } from "next/og";

export const alt = "Adisah African Store, Upper Marlboro MD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(circle at 85% 10%, #6e1611 0%, #140c0a 60%)",
          color: "#fbf6ee",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#f5c518", letterSpacing: 8, textTransform: "uppercase" }}>Upper Marlboro, MD</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1 }}>Adisah African Store</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#e8dccb" }}>African groceries delivered to your doorstep</div>
        </div>
        <div style={{ display: "flex", height: 16, width: "100%" }}>
          {["#f5c518", "#c8261e", "#1f8a4c", "#1e5aa8"].map((c) => (
            <div key={c} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
