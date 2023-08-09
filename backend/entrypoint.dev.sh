#!/bin/bash

if [[ "$DATABASE" = "postgres" ]]; then
    echo "Waiting for database..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started."
fi

python manage.py migrate
python manage.py runserver 0.0.0.0:8000

exec "$@"
