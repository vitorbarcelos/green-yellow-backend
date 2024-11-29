<p align="center"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## GreenYellow

Backend of GreenYellow


### Running the app

Para executar o projeto, é necessário ter o Docker e o Docker Compose instalados no seu ambiente. O Dockerfile e o Docker-compose.yml contêm as especificações dos containers necessários para a execução dele. Vale a pena conferir esses arquivos.

Insira os seguintes comandos no seu terminal para iniciar o backend no modo **Desenvolvimento**:
</br>1 - Para iniciar o backend no modo **Desenvolvimento**;
</br>2 - Para ver os logs da aplicação em tempo real.

```bash
# Development

1: ❯ docker compose up -d
2: ❯ docker container logs -f greenyellow-backend

```

</br>

Insira os seguintes comandos no seu terminal para iniciar o backend no modo **Produção**:
</br>1 - Para criar uma imagem a partir da especificação do Dockerfile;
</br>2 - Para criar um container a partir da imagem criada;
</br>3 - Para ver os logs da aplicação em tempo real.
</br>
</br>

```bash
# Production

1: ❯ docker buildx build --target prod -t greenyellow-backend:latest . --no-cache
2: ❯ docker run -d -p "3333:3333" --name greenyellow-backend 
-e DATABASE_NAME=greenyellow -e DATABASE_PORT="3306" [...]
greenyellow-backend:latest

3: ❯ docker container logs -f greenyellow-backend

```

O item **[...]** indica que outras variáveis de ambiente devem ser adicionadas ao container. Se isso não for realizado, o projeto não será iniciado. Veja mais detalhes no arquivo de [variáveis de ambiente](/development.env).

### Http Requests

Os arquivos de requisições da aplicação estão armazenados na pasta **/requests**. Sinta-se à vontade para exportar para uma plataforma que você goste, como o Postman e o Insomnia. Esses arquivos foram criados para usar no WebStorm da JetBrains.

```http
### Authorize user sample
POST http://localhost:3333/auth/authorize
Content-Type: application/json

{
  "password": "{{password}}",
  "email": "{{email}}"
}
```

### Tests
O projeto contém algumas coleções de testes unitários. Os testes de ponta-ponta não foram implementados devido a um prazo curto, todavia, houve um grande interesse em criá-los. Para executar os testes automatizados, insira os seguintes comandos no seu terminal:

```bash
# Unit

❯ yarn test

# Coverage 

❯ yarn test:cov
```

### Author

[Vitor Barcelos](https://barcelos.dev.br)
