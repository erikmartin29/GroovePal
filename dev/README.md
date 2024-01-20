# development setup

## database
once docker and docker-compose is installed:
```shell
    cd dev/database
    touch .env
```
Then add the following environment variables to your .env file in `dev/database/`.
```shell
    ROOT_PASS=secret
```
Finally, to run the database:
```shell
    cd dev/database && docker-compose up
    # or, to run in headless mode
    cd dev/database && docker-compose up -d 
```
to stop the container. From the `dev/database/` directory run 
```shell
    docker-compose down
```
