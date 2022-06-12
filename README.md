# HOW FAST CAN YOU TYPE?
A web application for testing your typing speed.


## Technologies
- Vue
- TypeScript
- Docker
- TypeORM
- PostgreSQL
- Express


## Screenshots
![Home](https://user-images.githubusercontent.com/81222680/173250555-65f62bb9-1021-448d-9309-7f3d69f32799.png)
![TypeResult](https://user-images.githubusercontent.com/81222680/173250085-21bc7105-f968-4d7b-a745-715062f388b5.png)
![Highscores](https://user-images.githubusercontent.com/81222680/173250205-049ad5cc-1bb6-4ccf-8bdd-714ec20d862e.png)


## Info
When starting the app for the first time with ``docker-compose`` postgres will
create the database for you. This means that it will not accept incoming
connections during that time. You might have to restart the backend after
the database is created.


## Production

To start the app in production mode:
```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
Navigate to `http://localhost:3000`

To rebuild the images add `--build` at the end of the command.


## Development

To start the app in development mode with hot reloading:
```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

Navigate to `http://localhost:3000`

To rebuild the images add `--build` at the end of the command.
