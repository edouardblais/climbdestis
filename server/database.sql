CREATE DATABASE climbdestis;

CREATE TABLE destis(
    id SERIAL PRIMARY KEY,
    destination VARCHAR(255),
    area VARCHAR(255),
    region VARCHAR(255),
    country VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    lastUpdate TIMESTAMP,
    gmaps VARCHAR(255),
    spotwx_10 VARCHAR(255),
    spotwx_4 VARCHAR(255),
    spotwx_2 VARCHAR(255),
    weather_channel VARCHAR(255),
    "8a" VARCHAR(255),
    mountainProject VARCHAR(255),
    restrictions VARCHAR(255),
    images TEXT,
    orientation VARCHAR(100)
);

CREATE TABLE apikeys(
    id SERIAL PRIMARY KEY,
    api VARCHAR(100),
    apikey VARCHAR(255)
)

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    destis_id INTEGER REFERENCES destis(id)
);
