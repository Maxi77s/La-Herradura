const express = require('express');

const BodyParse = require("body-parser");

const app = express();
const PORT = process.env.PORT || 49919;

app.use(BodyParse.urlencoded({ extended: true }));
app.use(BodyParse.json());

app.post("/api/admin/login", (req: any, res: { send: (arg0: string) => void; }) => {
  res.send("Admin API funcionando correctamente");
});

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
});
