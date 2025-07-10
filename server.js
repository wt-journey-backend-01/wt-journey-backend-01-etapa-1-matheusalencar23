const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

app.get("/sugestao", (req, res) => {
  const nome = req.query.nome?.trim();
  const ingredientes = req.query.ingredientes?.trim();
  if (!nome) console.log("O campo [nome] é obrigatório");
  if (!ingredientes) console.log("O campo [ingredientes] é obrigatório");

  if (nome && ingredientes) {
    console.log(`Nome: ${nome}\nIngredientes: ${ingredientes}`);
  }

  res.redirect("views/agradecimento.html");
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome) console.log("O campo [nome] é obrigatório");
  if (!email) console.log("O campo [email] é obrigatório");
  if (!assunto) console.log("O campo [assunto] é obrigatório");
  if (!mensagem) console.log("O campo [mensagem] é obrigatório");

  if (nome && email && assunto && mensagem) {
    console.log(
      `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`
    );
  }

  res.redirect("views/agradecimento.html");
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`DevBurger server is running on port ${PORT}`);
});
