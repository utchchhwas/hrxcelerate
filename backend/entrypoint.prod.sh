#!/bin/bash

if [[ "$DATABASE" = "postgres" ]]; then
    echo "Waiting for database..."

    while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started."
fi

python manage.py collectstatic --no-input --clear
python manage.py migrate --noinput
gunicorn backend.wsgi:application --bind 0.0.0.0:8001 -w 4

exec "$@"
