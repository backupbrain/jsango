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
JSango web server at port 8000 is running...
```

Client: 
```console
$ curl -D - http://localhost:8000/about/
HTTP/1.1 200 OK
Date: Sat, 19 Mar 2022 20:49:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

<h1>
    My name is John Doe
</h1>

```


