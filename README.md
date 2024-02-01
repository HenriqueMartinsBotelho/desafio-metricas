# Desafio

O objetivo central deste projeto é a criação de uma solução web full-stack, projetada para permitir que os usuários façam o upload de planilhas contendo dados de assinantes e, a partir desses dados, possam extrair e visualizar métricas de negócios essenciais. Estas métricas incluem o Monthly Recurring Revenue (MRR) e a Churn Rate, embora a plataforma esteja estruturada para incorporar e apresentar uma gama mais ampla de indicadores, o que representa um valor agregado significativo. A representação dessas métricas se dá por meio de gráficos dinâmicos e interativos, oferecendo uma experiência de usuário enriquecedora e insights valiosos sobre o desempenho do negócio.

# Tecnologias e Inovações Implementadas

Para a realização deste projeto, optei pela adoção do framework **NestJs**, notável pela sua robustez e eficiência. A estrutura foi meticulosamente elaborada para assegurar que todos os cálculos significativos, incluindo MRR (Monthly Recurring Revenue) e Churn Rate, fossem **executados no back-end**. Considera-se um **equívoco crítico** a realização dessas operações no front-end, devido a preocupações com a segurança dos dados, integridade e a simplificação da manutenção futura. Esta escolha estratégica visa prevenir práticas que possam afetar negativamente a solidez da aplicação.

No que tange ao gerenciamento de uploads de arquivos, utilizei o _Multer_, destacando-se pela sua eficiência e simplicidade. Para a construção da interface do usuário, foi selecionado o **VueJs 3**, complementado pela **Composition API** e pelo **Vuestic**, visando oferecer uma experiência visualmente atraente e altamente funcional. A aplicação é inclusiva, suportando multilinguagem **(Português, Inglês e Chinês)**, graças à implementação do _i18n_, reforçando o compromisso com a acessibilidade e a usabilidade global.

Para garantir a portabilidade e a facilidade de implantação usei o Docker criando um ambiente containerizado que simplifica o processo de configuração e lançamento da aplicação, assegurando uma reprodução fiel do ambiente de desenvolvimento em qualquer sistema.

# Executando o Projeto

**Com Docker:**
Assegure-se de ter o Docker e o Docker Compose previamente instalados. Para iniciar o projeto, execute o comando `docker-compose up` na raiz do diretório. A aplicação estará acessível via `http://localhost:3000`.

**Sem Docker:**
É necessário ter o NodeJs e o NPM. Inicie com `npm install` na raiz do diretório para instalar as dependências. Em seguida, utilize `npm run start:dev` para ativar o back-end e `npm run dev` para o front-end, configurando completamente o ambiente de desenvolvimento local.

### Front-End:

    [x] - Criar uma interface de usuário para upload de planilhas (formato .xlsx ou .csv).
    [x] - Após o retorno do back, exibir gráficos interativos (mês a mês) das métricas.
    [x] - Tecnologia recomendada: Vue.js 3 (Composition API).

### Back-End:

    [x] - Desenvolver uma API RESTful usando Node.js ou Python para processar os dados da planilha.
    [x] - Implementar lógica para calcular as métricas com base nos dados fornecidos.
    [x] - Tecnologia recomendada: NestJS.
    [x] - Utilizar bibliotecas como Chart.js ou D3.js para criar gráficos dinâmicos.
    [x] - Os gráficos devem ser claros, informativos e esteticamente agradáveis.

## Extras que adicionei

    [x] - Uso de Docker.
    [x] - Uso do i18n para dar suporte para 3 idiomas: Português, Inglês e Chinês.
    [x] - Uso do Vuestic para criar uma interface mais bonita.
    [x] - Responsividade.
