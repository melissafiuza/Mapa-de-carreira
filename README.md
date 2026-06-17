# Mapa de Carreira

Este repositório contém um site estático para apresentar um mapa de carreira em formato de currículo online. A página principal é o `index.html`, mas os dados exibidos na tela são carregados a partir do arquivo `assets/data/carreira.json`.

A ideia do projeto é separar estrutura, dados e apresentação:

- `index.html`: estrutura da página.
- `assets/data/carreira.json`: textos, contatos, habilidades, roadmap e link do currículo.
- `assets/js/carreira-json.js`: lê o JSON e monta o conteúdo na página.
- `assets/images/profile.jpg`: foto de perfil.
- `assets/css/`: arquivos de estilo usados pelo layout.

## Como atualizar os dados

Para alterar as informações do mapa de carreira, edite o arquivo:

```text
assets/data/carreira.json
```

Os principais campos são:

- `seo`: título, descrição, autor e URL canônica da página.
- `profile`: nome, resumo, foto, texto alternativo da foto e link do currículo.
- `contacts`: lista de contatos, como e-mail, LinkedIn e GitHub.
- `careerSteps`: etapas do mapa de carreira, com descrição, soft skills e roadmap.
- `skillGroups`: grupos de habilidades com nível de conhecimento.
- `otherSkills`: outras competências.

Depois de editar o JSON, confira se o arquivo continua válido. Atenção especial para:

- usar aspas duplas em textos e nomes de campos;
- separar itens com vírgula;
- evitar vírgula sobrando no último item de uma lista ou objeto;
- manter os caminhos corretos para arquivos, como imagens e currículo.

## Currículo em PDF

Não se esqueça de anexar o curriculum vitae em português ao projeto.

Uma sugestão é criar uma pasta para documentos, por exemplo:

```text
assets/docs/curriculo.pdf
```

Depois, atualize o campo `cvUrl` em `assets/data/carreira.json`:

```json
"cvUrl": "assets/docs/curriculo.pdf"
```

Antes de publicar, teste o botão **Baixar currículo em PDF** e confirme que o arquivo abre corretamente.

## Como testar localmente

Como o site carrega os dados com `fetch`, abrir o `index.html` diretamente pelo navegador pode não funcionar em alguns casos. O ideal é testar usando um servidor local.

Se você tiver Python instalado, rode na raiz do repositório:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

Também é possível usar extensões como Live Server no VS Code.

Antes de considerar o site pronto, teste:

- se o nome, resumo, habilidades e mapa de carreira aparecem corretamente;
- se a foto de perfil carrega;
- se o currículo em PDF abre;
- se todos os links de contato funcionam;
- se os links internos do menu levam para as seções corretas;
- se não há erros no console do navegador;
- se a página funciona bem no celular e no computador.

## Como publicar no GitHub Pages

1. Envie o repositório para o GitHub.
2. No GitHub, abra o repositório.
3. Vá em **Settings**.
4. No menu lateral, clique em **Pages**.
5. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` ou `master`
   - **Folder**: `/ (root)`
6. Clique em **Save**.

Depois de alguns minutos, o GitHub Pages vai gerar uma URL parecida com:

```text
https://seu-usuario.github.io/nome-do-repositorio/
```

Quando a página estiver publicada, atualize o campo `canonicalUrl` em `assets/data/carreira.json` com a URL real do GitHub Pages:

```json
"canonicalUrl": "https://seu-usuario.github.io/nome-do-repositorio/"
```

## Checklist antes de entregar

- Atualizar todos os dados em `assets/data/carreira.json`.
- Substituir a foto em `assets/images/profile.jpg`, se necessário.
- Anexar o curriculum vitae em português.
- Atualizar o campo `cvUrl` com o caminho correto do PDF.
- Testar todos os links.
- Testar o site localmente com servidor.
- Publicar no GitHub Pages.
- Abrir a URL publicada e testar tudo novamente.
