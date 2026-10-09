# Mapa do Espaço Social e Habitus Político (Bourdieu x TSE)

Aplicação web interativa desenvolvida para mapear o Espaço Social e Habitus dos candidatos às eleições brasileiras, utilizando como referencial teórico a Sociologia da Cultura de Pierre Bourdieu e dados oficiais do TSE extraídos via Base dos Dados.

---

## Objetivo do Projeto

Analisar a distribuição dos diferentes tipos de capitais entre os atores políticos no Brasil através da construção de um mapa bi-dimensional de coordenadas:

- Capital Econômico: Medido através do patrimônio total dos candidatos (soma dos bens declarados ao TSE, convertidos em escala logarítmica).
- Capital Cultural: Mapeado com base no grau de instrução/escolaridade e ocupação profissional dos candidatos.
- Capital Político/Ideológico: Agrupado por partidos políticos e suas respectivas posições institucionais.

---

## Tecnologias Utilizadas

- SQL & Google Cloud BigQuery: Consulta, unificação e agregação dos microdados de candidaturas e bens declarados (br_tse_eleicoes).
- JavaScript (ES6+): Manipulação assíncrona dos arquivos .json via Fetch API e cruzamento de dados em memória.
- HTML5 & CSS3: Interface responsiva para exibição da visualização.
- Git & GitHub Pages: Versionamento do código e hospedagem contínua da aplicação.

---

## Estrutura dos Arquivos

```text
├── index.html         # Estrutura principal da página web
├── style.css          # Estilização visual e layout da interface
├── script.js          # Lógica do fetch, tratamento e unificação dos JSONs
├── candidatos.json    # Dados extraídos do TSE (instrução, ocupação, partido)
├── bens.json          # Dados agregados do patrimônio dos candidatos
└── README.md          # Documentação do projeto
