DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS secrets;

CREATE TABLE users ( 
    user_id VARCHAR(100) NOT NULL,
    user_fname VARCHAR(40) NOT NULL,
    user_lname VARCHAR(40) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE secrets (
    secret_id VARCHAR(10) NOT NULL,
    secret_value VARCHAR(255) NOT NULL,
    PRIMARY KEY (secret_id)
);

