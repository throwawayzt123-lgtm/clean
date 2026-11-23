import { ImageResponse } from "next/og";

export const alt = "C4 Cleaning, professional cleaning company in Lahore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 10%, #2a3305 0%, #050505 55%, #000 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", background: "#DFFE12", color: "#000", fontSize: 64, fontWeight: 900, padding: "6px 26px", borderRadius: 22 }}>C4</div>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 8, color: "#DFFE12" }}>CRYSTAL CLEAR CLEANING COMPANY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02 }}>Shining standards,</div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02, color: "#DFFE12" }}>spotless results.</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#cfcfcf" }}>House · Office · Window · Post-construction cleaning in Lahore</div>
      </div>
    ),
    size,
  );
}
