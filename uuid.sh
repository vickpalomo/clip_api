psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
   CREATE database clip_test;
EOSQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="$POSTGRES_DB"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="clip_test"<<-EOSQL
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
