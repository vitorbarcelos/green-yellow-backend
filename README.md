<p align="center"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## GreenYellow

Backend of GreenYellow

### Running the app

To run the project, you need to have Docker and Docker Compose installed on your environment. The Dockerfile and docker-compose.yml files contain the specifications of the containers needed to run it. It's worth checking out these files.

Use the following commands in your terminal to start the backend in **Development** mode:
</br>1 - To start the backend in **Development** mode;
</br>2 - To view the application logs in real-time.

```bash
# Development

1: ❯ docker compose up -d
2: ❯ docker container logs -f greenyellow-backend

```

Use the following commands in your terminal to start the backend in **Production** mode:
</br>1 - To build an image from the Dockerfile specification;
</br>2 - To create a container from the built image;
</br>3 - To view the application logs in real-time.
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

The **[...]** item indicates that additional environment variables should be added to the container. If this is not done, the project will not start. For more details, refer to the [environment variables](/development.env) file.

### Documentation
The API documentation is available on Swagger, accessible via:

http://localhost:3333/docs

In Swagger, you will find details about the application’s modules and endpoints, including the available HTTP methods, input parameters, and responses for each endpoint.

### Tests
The project includes some unit test collections. End-to-end tests were not implemented due to a short deadline; however, there was strong interest in creating them. To run the automated tests, use the following commands in your terminal:

```bash
# Unit

❯ yarn test

# Coverage 

❯ yarn test:cov
```

### Author

[Vitor Barcelos](https://barcelos.dev.br)