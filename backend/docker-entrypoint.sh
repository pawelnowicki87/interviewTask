#!/bin/sh
set -e

echo "📦 NODE_ENV=${NODE_ENV:-development}"
DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-3306}"

echo "⏳ Waiting for MySQL at $DB_HOST:$DB_PORT..."
until nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done
echo "✅ MySQL is up."

echo "📜 Running migrations..."
npx sequelize-cli db:migrate

SHOULD_SEED=$(node scripts/should-seed.mjs || echo "NO")
if [ "${FORCE_SEED:-false}" = "true" ]; then
  SHOULD_SEED="YES"
fi

if [ "$SHOULD_SEED" = "YES" ]; then
  echo "🌱 Running seeders..."
  npx sequelize-cli db:seed:all
else
  echo "⏭️  Skipping seeders."
fi

echo "🚀 Starting app..."
exec npm start
