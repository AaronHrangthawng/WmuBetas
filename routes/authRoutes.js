router.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("ENV USER:", process.env.ADMIN_USER);
  console.log("ENV PASS:", process.env.ADMIN_PASS_PLAIN);
  console.log("INPUT USER:", username);
  console.log("INPUT PASS:", password);

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS_PLAIN
  ) {
    return res.json({ success: true });
  }

  res.status(401).json({ error: "Invalid credentials" });
});
