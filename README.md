## CHAMADAS SINCRONAS
- http
- API
- Java + PostgreSQL
- Mongo + JS
- Docker + Docker Compose e Heroku
- Simular Sistema de vendas
- 3 aplicações
  1. Autenticação
    - App_login
    - Node.js
    - Login
    - Token
    - JWT --> Auth API --> MongoDB
  2. Vendas
    - App_shop
    - Node.js
    - Registrar vendas
  3. Estoque
    - App_stock
    - Java
    - Estoque de produtos
  
### Casos de uso

- Sempre que uma venda for realizada:
  - App_shop envia mensagem para App_stock para autualização do produto no estoque
- Para cada venda:
  - Antes:
    - App_shop requisita App_stock para verificar se produto existe
      - Requisição pelos ID`S
  - Depois:
    - App_shop deve receber uma mensagem de venda para validar se tudo foi ok
      - CANCELADA ou CONCLUIDA

- Servidor mensageria
- RabbitMQ
  - Producer
  - Consumer

- Docker:
  - Compose
  - Containers:
    - App_shop
    - App_stock
    - App_login
    - MongoDB
    - PostgreSQL
    - RabbitMQ

## Arquitetura monolitica

- Monolitico é muito util para a maioria dos serviços
- Excelente para aplicaçõe de pequeno e médio porte
- Browser || Mobile ===rest==> Load Balancer ===> EstoreUI ===> RDBMS

* EstoreUI:
  - CatalogService
    - Product
  - PaymentService
    - Payment
  - OrderService
    - Order

## Arquitetura microserviços

- Aplicação desmenbrada em varios componentes
- Cada microserviço tem sua arquitetura
- Exemplo:
  - App_shop -> Aplicação de vendas
  - App_stock -> Aplicação de estoque
  - App_login -> Aplicação de autenticação
  - App_payment -> Aplicação de pagamento

- Minimo de acoplamento
- Divisão de deploys
- Formato API Rest
- Comunicação entre microserviços:
  - Assincrono ou sincrono
- MOdulos independentes
- Variedade de stacks
- Escalavel
- **OBS:** Cada microserviço deve ter sua DB

Website ===rest===> GATEWAY ===> Microserviço 1 ====> DB_1 ===> Microserviço 2 ====> DB_2

## Comunicações

#### Sincrono
- API Rest
- Requisição que aguarda uma resposta
- Emissor e receptor
- Exemplo:
  1. Cliente faz uma requisição
  2. Servidor recebe a requisição
  3. Servidor responde a requisição
    - Status
    - Resposta
  4. Cliente recebe a resposta
- Thread block
- Metodos HTTP:
  - POST, GET, PUT, DELETE, HEAD, OPTIONS, PATCH
  - OPTIONS: Verifica se o servidor suporta determinado recurso
  - HEAD: Recupera metadados

#### Assincrono
- Requisição que não aguarda resposta
- Não sabemos quando sera a mensagem de retorno
- Emissor e receptor
- Fila de mensagens
- AMQP
- APP(publisher) ---> QUEUES ---> APP(consumer)
- Fila sempre deve estar ouvindo
- RabbitMQ:
  - Exchange:
    - Regras de roteamento:
      - Direct Exchange
        - routing key:
          - decide qual destino vai receber a mensagem
        - chave de roteamento
        - Como o id da mensagem
        - Key = k --> se uma mensagem com a routing key R for recebida, a mensagem vai para o consumidor(R = k)
        - Filtro pela chave
      - Topic Exchange
        - Varios Padrões de roteamento
        - Exchange e routing key
        - 1 EXCHANGE -> N ROUTING KEYS
        - A diferencia de Topic e Direct:
          - Possibilidade de usar variados regex nas keys
          - Exemplo:
            - key.*
            - key.#
      - Fanout Exchange
        - Utilizadas em mensagens gerais
        - Mensagens para todos os consumidores
        - Ignora a routing key
        - N filas são vinculadas ao fanout, logo uma copia sera enviada para cada consumidor
      - Headers Exchange
        - Varios atributos
        - Não usa routing key
        - Valor da Header fica no cabeçalho da requisição
        - Header ==> Exchange ==> Consumer

        - Exchanges:
          - Nome
          - Durabilidade:
            - Quando o servidor reiniciar, podem ser deletadas
          - Auto-delete:
            - Deleta automaticamente quando não houver filas vinculadas
          - Argumentos:
            - Configuração:
              - TTL
              - Prefetch
        
        - Queues:
          - Nome
          - Durabilidade:
            - Quando o servidor reiniciar, podem ser deletadas
          - Auto-delete:
            - Deleta automaticamente quando não houver consumers vinculadas
          - Argumentos:
            - Configuração:
              - TTL
              - Prefetch

