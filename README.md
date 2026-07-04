# API-REST-Performance-Demo: Demonstração de Otimização com Cache In-Memory

## Visão Geral

Este projeto é uma demonstração didática e conceitual de **por que cache importa** em APIs REST. Ele expõe dois endpoints com o mesmo tipo de dado (transações mockadas), um simulando um "cache hit" (acesso direto a dados em memória) e outro simulando um "cache miss" com uma latência artificial de 500ms para tornar visível, na prática, o impacto de uma estratégia de cache bem pensada.

Não é uma API em produção nem um sistema de missão crítica: é um exercício de arquitetura, feito para ilustrar um conceito com código real e mensurável.

## Destaques Técnicos

* **TypeScript**: tipagem forte em todas as entidades (`Transaction`, `PerformanceResult`)
* **Medição real de performance**: uso de `perf_hooks` para medir o tempo de execução de cada requisição, sem números inventados
* **Estrutura RESTful**: API versionada (`/api/v1/`)
* **Comparação lado a lado**: dois endpoints, mesmo dado, estratégias diferentes. A melhor forma de visualizar o ganho de uma abordagem sobre a outra

## Tecnologias Utilizadas

* Node.js
* TypeScript
* Express.js
* `perf_hooks` (medição de performance)

## Como Executar o Projeto Localmente

**Pré-requisitos**

* Node.js (versão 14 ou superior)
* npm ou yarn

**Instalação e Execução**

1. Clone o repositório:

```bash
git clone https://github.com/walbueno/API-REST-Performance-Demo.git
cd API-REST-Performance-Demo
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor em modo de desenvolvimento:

```bash
npm run start
```

**Endpoints de Teste**

O servidor inicia na porta `3000`.

| Endpoint | Método | Descrição |
|---|---|---|
| `http://localhost:3000/api/v1/transactions/recent` | `GET` | **Endpoint otimizado**: busca transações direto da memória, sem latência artificial |
| `http://localhost:3000/api/v1/transactions/slow-mock` | `GET` | **Endpoint de comparação**: mesma busca, com 500ms de latência simulada, para evidenciar o ganho do cache |

## O que este projeto demonstra (e o que não demonstra)

**Demonstra:** entendimento prático de por que acesso em memória supera I/O lento, medição de performance com ferramentas nativas do Node, e organização de código limpa e tipada.

**Não demonstra:** um sistema em produção, banco de dados real, ou carga de tráfego real. Os dados são mockados e o objetivo é pedagógico, não uma prova de escala.
