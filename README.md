# API-REST-Performance-Demo: Demonstração de Arquitetura de API de Alta Performance

## Visão Geral

Este projeto serve como uma prova de conceito para o desenvolvimento de APIs REST escaláveis e de alta performance utilizando **Node.js**, **TypeScript** e **Express**. Ele simula um endpoint otimizado que usa técnicas como cache in-memory e otimização de consulta para garantir tempos de resposta abaixo de 1ms, demonstrando proficiência em Back-end de Missão Crítica.

## Destaques Técnicos

* **TypeScript (TS)**: Utilização rigorosa para tipagem forte, garantindo a robustez do código e facilitando a manutenção.
* **Otimização de Desempenho**: Simulação de acesso a dados em cache (`perf_hooks`) para medir e garantir a baixa latência das respostas.
* **Estrutura RESTful**: Implementação de uma arquitetura de API limpa e versionada (`/api/v1/`).
* **Boas Práticas de Código**: Código bem comentado, modularizado e focado em separação de responsabilidades.

## Tecnologias Utilizadas

* Node.js
* TypeScript
* Express.js
* `perf_hooks` (Para medição de performance)

## Como Executar o Projeto Localmente

**Pré-requisitos**

* Node.js (versão 14 ou superior)
* npm ou yarn

**Instalação e Execução**

1. Clone o repositório:

```
git clone [https://github.com/WilliamBueno/API-REST-Performance-Demo.git](https://github.com/WilliamBueno/API-REST-Performance-Demo.git)
cd API-REST-Performance-Demo
```

2. Instale as dependências:

```
npm install
# ou yarn install
```

3. Execute o servidor em modo de desenvolvimento (o TypeScript será compilado automaticamente):

```
npm run start # ou yarn start
```

**Endpoints de Teste**

O servidor será iniciado na porta `3000`.

|                        Endpoint                            |    Método    |                                                                 Descrição                                                                                  |
|------------------------------------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     `http://localhost:3000/api/v1/transactions/recent`     |    GET       |      **Endpoint Otimizado**: Busca transações recentes, simulando um "cache hit" para demonstrar tempos de resposta ultrarrápidos (idealmente < 1ms).      |
|    `http://localhost:3000/api/v1/transactions/slow-mock`   |    GET       |      **Endpoint de Comparação**: Simula uma consulta lenta de banco de dados (500ms de latência) para demonstrar a importância da otimização.              |

## Valor Adicionado ao Portfólio

Este projeto é a prova da minha capacidade de escrever código Back-end que não apenas funciona, mas que é projetado para **escalabilidade e alta concorrência**, resolvendo o gargalo de performance frequentemente encontrado em sistemas legados.
