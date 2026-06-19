type SiteIconMarkProps = {
  size: number;
  label?: string;
};

export function SiteIconMark({ size, label = "L" }: SiteIconMarkProps) {
  const fontSize = Math.round(size * (label.length > 1 ? 0.22 : 0.55));

  return (
    <div
      style={{
        background: "#fbf9f8",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1f5d3a",
        fontSize,
        fontWeight: 600,
        letterSpacing: label.length > 1 ? "-0.04em" : "-0.02em",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {label}
    </div>
  );
}
