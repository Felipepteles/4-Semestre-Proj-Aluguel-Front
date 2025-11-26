## 🛠️ README do Projeto: Caixa de Ferramentas

Uma plataforma web intuitiva e eficiente para o aluguel de ferramentas, simplificando o processo de reserva para clientes e a gestão de estoque para administradores.

---

### 🌟 Visão Geral

Este projeto visa modernizar e otimizar a experiência de aluguel de ferramentas. Ele oferece um **catálogo online** completo para os clientes e um **dashboard administrativo** robusto para gerenciar o inventário, reservas e indicadores de desempenho.

### ✨ Funcionalidades Principais

#### 1. Módulo do Cliente (Frontend)

* **Catálogo de Ferramentas:** Visualização de todas as ferramentas disponíveis, com detalhes (diária, marca, categoria).
* **Solicitação de Reserva:** Formulário intuitivo para seleção de datas de início e fim.
* **Cálculo em Tempo Real:** O valor total da reserva é calculado e exibido instantaneamente com base na diária e no período selecionado.
* **Status de Reserva:** Confirmação e comunicação do pedido de reserva para o backend (API).

#### 2. Módulo Administrativo (Dashboard)

* **KPIs Essenciais:** Visão rápida das contagens totais de Clientes, Ferramentas e Reservas.
* **Métricas de Desempenho:** Gráficos interativos para análise gerencial, incluindo:
    * Top 5 Ferramentas Mais Reservadas
    * Top 5 Marcas Mais Populares
    * Distribuição de Reservas por Categoria
    * Crescimento da Base de Clientes

---

### ⚙️ Tecnologias Utilizadas

Este projeto foi construído com uma abordagem de desenvolvimento moderna, utilizando as seguintes tecnologias:

| Categoria | Tecnologia | Uso |
| :--- | :--- | :--- |
| **Frontend** | **React** (com TypeScript) | Biblioteca principal para a construção da interface do usuário. |
| **Design/UI** | **Flowbite** (para React) | Componentes de UI responsivos, incluindo o Datepicker para a reserva. |
| **Gráficos** | **Victory** | Utilizado para renderizar os gráficos de desempenho no Admin Dashboard. |
| **Gerenciamento de Estado** | **Zustand** | Gerenciamento global do estado da aplicação. |
| **Backend/API** | **Node.js/Prisma** | API para gestão de usuários, inventário, persistência das reservas e ORM. |

---

### 🚀 Começando

Siga estas instruções para ter uma cópia do projeto em execução na sua máquina local para fins de desenvolvimento e teste.

#### Pré-requisitos

Você precisará ter o **Node.js** e o **npm** (ou Yarn/pnpm) instalados em sua máquina.

#### Instalação

1.  **Clone o Repositório:**
    ```bash
    git clone [https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github](https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
    cd [pasta-do-projeto]
    ```
2.  **Instale as Dependências (Frontend):**
    ```bash
    npm install
    # ou yarn install
    ```
3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione a URL da sua API:
    ```
    REACT_APP_API_URL=http://localhost:3000/api
    ```
4.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    # ou yarn dev
    ```
    O aplicativo estará rodando em `http://localhost:5173` (ou porta similar).

---

### 🤝 Contribuições

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um Fork do Projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`).
3.  Commit suas Mudanças (`git commit -m 'Add some AmazingFeature'`).
4.  Push para a Branch (`git push origin feature/AmazingFeature`).
5.  Abra um Pull Request.

---

### 📄 Licença

Distribuído sob a Licença **MIT** (ou **GPL**, **Apache**...). Consulte o arquivo `LICENSE` para mais informações.

---

## 👥 Equipe de Desenvolvimento

<div align="center">

| Foto | Membro | Função | GitHub |
| :--: | :--- | :--- | :--- |
| <a href="https://github.com/T1P3R31R4"><img src="./public/Tiago.png" alt="Tiago Pereira" width="80"></a> | Tiago Pereira | Desenvolvedor Front-end | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/T1P3R31R4) |
| <a href="https://github.com/Felipepteles"><img src="./public/felipe.png" alt="Felipe Teles" width="80"></a> | Felipe Teles | Desenvolvedor Back-end | [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Felipepteles) |
</div>

### 🧱 Arquitetura e Backend

Este projeto utiliza uma arquitetura de microserviços/separada, onde o frontend (este repositório) e o backend (API) operam de forma independente.

O backend é responsável por:
* Gerenciamento do Banco de Dados (Inventário de Ferramentas e Dados dos Clientes).
* Processamento e persistência das requisições de Reserva.
* Fornecimento dos dados necessários para a Dashboard (KPIs e Métricas).

**Link do Repositório do Backend (API):**

[🔗 Acesse o Repositório da API do Projeto Aqui](https://github.com/Felipepteles/4-Semestre-Proj-Aluguel-API)

Para que o aplicativo funcione corretamente, certifique-se de que o projeto de backend também esteja configurado e em execução, e que a URL em seu arquivo `.env` esteja correta.
