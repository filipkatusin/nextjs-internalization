export default function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({ data: "data" }, { maxAge: 60 * 60 });
  res.redirect("/");
}
