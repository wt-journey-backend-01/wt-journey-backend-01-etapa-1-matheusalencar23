const fs = require("fs");
const express = require("express");
const path = require("path");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.get("/sugestao", (req, res) => {
  const nome = req.query.nome?.trim();
  const ingredientes = req.query.ingredientes?.trim();
  if (!nome) console.log("O campo [nome] é obrigatório");
  if (!ingredientes) console.log("O campo [ingredientes] é obrigatório");

  if (nome && ingredientes) {
    gerarPaginaAgradecimento(
      "Agradeçemos sua sugestão",
      `
        <ul>
          <li>Nome: ${nome}</li>
          <li>Ingredientes: ${ingredientes}</li>
        <ul>
      `,
      res
    );
  }
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome) console.log("O campo [nome] é obrigatório");
  if (!email) console.log("O campo [email] é obrigatório");
  if (!assunto) console.log("O campo [assunto] é obrigatório");
  if (!mensagem) console.log("O campo [mensagem] é obrigatório");

  if (nome && email && assunto && mensagem) {
    gerarPaginaAgradecimento(
      "Agradeçemos o contato, retornaresmo o mais rápido possível",
      `
        <ul>
          <li>Nome: ${nome}</li>
          <li>Email: ${email}</li>
          <li>Assunto: ${assunto}</li>
          <li>Mensagem: ${mensagem}</li>
        <ul>
      `,
      res
    );
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(`DevBurger server is running on port ${PORT}`);
});

function gerarPaginaAgradecimento(title, content, res) {
  fs.readFile(
    path.join(__dirname, "views", "agradecimento.html"),
    "utf8",
    (err, html) => {
      if (err) {
        return res.status(500).send("Erro ao carregar a página.");
      }

      let newHtml = html;

      newHtml = html
        .replace("{{title}}", title)
        .replace("{{content}}", content);

      // newHtml = html.replace("{{title}}", "").replace("{{content}}", "");

      res.send(newHtml);
    }
  );
}
