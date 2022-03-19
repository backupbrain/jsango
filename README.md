# JSango

This is a demo project to show how Django is implemented, but using
Javascript as the implementation language.

The purpose is to understand the concepts that build the Django framework
in a language that basically all web developers understand.

It has not been built to run properly.

## Setup

There is a `dummy-user-database.json` which contains a fake email address and name for a single user.

I decided to use JSON instead of SQL because with JSON I can just load the file and run, and I don't need to worry about SQL dependencies, or converting to and from SQL, etc etc.

This also has a single "app", `blog/` which can be configured to work similar to a Django project.

## Running:

Server: 

```console
$ node manage.js runserver
```

Client: 
```console
curl http://localhost:8000/about/
```


