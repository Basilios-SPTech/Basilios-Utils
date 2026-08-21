# Basilios Docs

Documentação e artefatos de arquitetura do projeto **Basilios** (plataforma de delivery — SPTech).

## Arquitetura (visão do ecossistema)

```mermaid
flowchart TB
  subgraph clients [Clientes]
    browser[Browser]
  end

  subgraph app [Aplicacao]
    web[basilios-web_React]
    api[basilios-api_SpringBoot]
    email[basilios-email-api]
  end

  subgraph data [Dados_e_mensageria]
    mysql[(MySQL)]
    mq[RabbitMQ]
    s3[AWS_S3]
  end

  subgraph infra [basilios-infra]
    docker[Docker_Compose]
    iac[Terraform_CloudFormation]
  end

  browser --> web
  web -->|REST_JWT| api
  api --> mysql
  api --> s3
  api -->|OrderStatus_PasswordReset| mq
  mq --> email
  email --> mysql
  docker -.-> web
  docker -.-> api
  docker -.-> email
  docker -.-> mysql
  docker -.-> mq
  iac -.-> docker
```

Fluxo principal: o cliente usa o **web**; a **api** autentica (JWT), persiste pedidos/produtos no **MySQL** e envia imagens ao **S3**; mudanças de status e reset de senha vão para o **RabbitMQ** e são consumidas pelo **email-api**.

## Diagramas e artefatos no repositório

- `arquitetura_aws.png` / `arquitetura_v2.png` / `diagram_v1.png`
- `diagrama de classes.png`
- Planilha de arquitetura do grupo
- `code-snippets/`, `Docs-JUnit/`, `sql/`

## Repositórios de código

| Repositório | Papel |
|-------------|--------|
| [basilios-web](https://github.com/Basilios-SPTech/basilios-web) | Frontend React |
| [basilios-api](https://github.com/Basilios-SPTech/basilios-api) | API Spring Boot |
| [basilios-email-api](https://github.com/Basilios-SPTech/basilios-email-api) | Microsserviço de e-mail |
| [basilios-infra](https://github.com/Basilios-SPTech/basilios-infra) | Docker + IaC AWS |

## Licença

MIT — veja [LICENSE](LICENSE).
