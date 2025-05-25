# Gerenciador de Filmes

Uma aplicação web para gerenciar sua coleção de filmes. Esta aplicação permite aos usuários adicionar, visualizar e excluir filmes com avaliações e descrições.

## Tecnologias Utilizadas

- **Next.js**: v15.3.2
- **React**: v18.2.0
- **TypeScript**: v5.0.0
- **React Modal**: v3.16.1
- **React Toastify**: v9.1.3
- **Font Awesome**: v6.4.0

## Como Começar

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/suehtamCruz/movie-manager.git
cd movie-manager
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em http://localhost:4200

## Servidor Backend

Esta aplicação requer um servidor backend rodando em http://localhost:3000. Certifique-se de que o servidor backend esteja em execução antes de usar esta aplicação.

## Credenciais de Login Padrão

- **Usuário**: Admin
- **Senha**: admin

## Funcionalidades

- Autenticação de usuário (login/logout)
- Visualização da lista de filmes
- Adição de novos filmes com nome, descrição e avaliação
- Exclusão de filmes
- Design responsivo

## Estrutura do Projeto

```
src/
├── components/     # Componentes de UI reutilizáveis
├── pages/          # Páginas do Next.js
├── services/       # Classes de serviço para API
└── styles/         # Módulos CSS
```

## Endpoints da API

- `POST /auth/login` - Autenticação de usuário
- `GET /movie` - Buscar todos os filmes
- `POST /movie` - Adicionar um novo filme
- `DELETE /movie/:id` - Excluir um filme pelo ID

## Licença

MIT
