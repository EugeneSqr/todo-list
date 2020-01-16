#### Overview
This is a backend part of the app

#### Development database
The database gets created automatically when db container is built. It stays there until the container is destroyed. You can preserve the database across coding sessions by

docker-compose down

If you want to destroy the existing database and start over, use

docker-compose down -v

#### Integration tests
This is the fastest way to make sure all the pieces play nicely together. Run

docker-compose exec service pytest -s

Integration tests do not clean up after themselves. The result of their work can be used in manual testing. The database can be safely dropped and recreated any time (see above).

#### A friendly docker-compose reminder
All docker-compose commands should be run at the top level of the project (one level above this one).

docker-compose has nothing to do with deployment to production. It's a pure development tool in this project's context.
