#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;

for d in $(echo $DATABASES | tr "," "\n")
do
psql --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE $d;
  GRANT ALL PRIVILEGES ON DATABASE $d TO $POSTGRES_USER;
EOSQL
psql --username "$POSTGRES_USER" --dbname "$d" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
done
