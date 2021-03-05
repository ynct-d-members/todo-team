#!/bin/bash

set -ex

echo "DATABASE_URL=${DATABASE_URL}" >> .env.local
echo "POSTGRES_USER=$POSTGRES_USER" >> .env.local
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> .env.local
echo "POSTGRES_DB=$POSTGRES_DB" >> .env.local