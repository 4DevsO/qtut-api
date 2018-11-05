# Contribuindo

Olá, aqui você vai aprender as regras de como fazer uma merda com o formato perfeito, para que ela não feda tanto.

---

## Configurando a máquina

#### Node

Para começar será necessário a instalação do [Node](https://nodejs.org). Nesse projeto optamos pela utilização da atual versão LTS do Node, a v10.\*.  
Recomendamos também a utilização do [NVM](https://github.com/creationix/nvm) para a instalação do Node para evitar problemas de permissão.

#### Editor de Texto

`Use o VS Code 👺 !`

Brincadeira, aceitamos seu mau gosto aqui também.

Independente do seu editor de texto, é recomendado a instalação do plugin do `ESLint`, `EditorConfig` e `Prettier`.  
Caso prefira não usa-los ou seu editor não possua esses plugins, rode `npm run lint` para ver se o seu codigo não está com algum erro que você não viu (Não seguir o StyleGuide também é um erro).

`SEUS COMMITS NÃO SERÃO ACEITOS SE NÃO PASSAR NO TESTE DO ESLINT`

---

## Desenvolvendo

Primeiro você vai precisar clonar esse repositório.

```sh
$ git clone https://github.com/4DevsO/qtut-api.git
```

Depois de clonar o repositório em sua máquina é necessário instalar as dependências.

```sh
$ cd qtut-api
$ npm i
```

Para começar a rodar o servidor e desenvolver alguma coisa você tem as seguintes opções:

- Rodar o `npm start`, porém não esse comando não possui `hot-reload` nem `source-map`
- Rodar o `npm run start:dev` (mais recomendado), possui `hot-reload` e `source-map`

Agora é só começar a mexer no código e depois fazer um PR no nosso repositório.

---

## Scripts

| Script              | Descrição                          |
| ------------------- | ---------------------------------- |
| `npm start`         | Roda o servidor de produção        |
| `npm run lint`      | Roda testes de lintagem            |
| `npm run start:dev` | Roda o servidor de desenvolvimento |

---

## Commits

As mensagens de commit deve seguir o seguinte formato:

```
categoria: descrição
```

Categorias que você pode utilizar:

- `ruptura` - Indica alguma breaking change
- `funcionalidad` - Indica a criação de uma nova funcionalidade
- `reparacion` - Indica conserto de algum bug
- `rendimento` - Indica melhoramento na perfomance da aplicação
- `refac` - Indica refatoramento de alguma funcionalidade
- `documentacion` - Indica atualização de documentação

Caso seu commit tenha alguma ligação com uma `issue` utilize as [tags de citação](https://help.github.com/articles/closing-issues-using-keywords/) do GitHub. Eg:

```
$ git commit -m "reparacion: consertando bug de autenticação (fixes #17)"
```

---

## Criando uma Issue

Crie uma issue pelos seguintes motivos:

- Você encontrou um bug
- Você gostaria de solicitar uma funcionalidade
- Você tem ideias para melhorar a performance da aplicação
- Você tem alguma questão para ser discutida com a equipe
