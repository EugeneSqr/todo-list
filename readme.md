### Overview
This is yet another todo app. It consists of two parts: web and service. Each one is located in a dedicated folder and has its own description.

### Setting up development environment
Make sure `docker` (19.03.5) and `docker-compose` (1.25.0) are up and running. Navigate to the project's top directory (this one) and run
```
docker-compose up
```

### Deployment to Heroku
Both parts of the project can be deployed to Heroku. Each part should reside in its own Heroku app.
1. Create first Heroku app for service
```
heroku create todo-list-serviceapp
```
The CLI creates a remote named 'heroku' in the repository. Rename it to heroku-service
```
git remote rename heroku heroku-service

2. Create second Heroku app for web
```
heroku create todo-list-webapp
```
Rename the remote again
```
git remote rename heroku heroku-web
```
3. At this point we have two Heroku apps and a git repo with at least three remotes: origin, heroku-service, heroku-web. We're going to use subrees to deploy `service` and `web` indepentently
```
git subtree split --prefix service -b service
git push -f heroku-service service:master
git branch -D service
```
```
git subtree split --prefix web -b web
git push -f heroku-web web:master
git branch -D web
```
