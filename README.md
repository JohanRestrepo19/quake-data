# Quake Data System

This project consist in fetching data from an external source [USGS](https://www.usgs.gov/programs/earthquake-hazards) which exposes a public API to get recent earthquake information. So through a Rake task we synchronize our database with the earthquake activity of the last 30 days and then expose two endpoints to be used in the client/frontend. The backend was built using a ruby gem called JSONAPI::Resources in order to be compliant with the JSON API standard.

## Stack

### Ruby

- [Ruby on Rails](https://rubyonrails.org/) - Ruby full-stack framework for building web applications.
- [JSONAPI::Resources](https://jsonapi-resources.com/) - The ruby gem for Json API compliance.

### Typescript
- [Next.js](https://nextjs.org/) - React Framework for building full-stack web applications.
- [Tailwind Css](https://tailwindcss.com/) - Utility-first Css framework.
- [Shadcn/ui](https://ui.shadcn.com/) - Collection of re-usable components.
- [Tanstack Query](https://tanstack.com/query/latest) - A powerfull asynchronous state managament for TS and React.
- [Tanstack Table](https://tanstack.com/table/latest) - Headless UI for building powerful tables.

## Project Structure

A brief overview of Project folder structure.

```
.
│   # Here is where we hold the Ruby on Rails project
├── backend/
│   │   # This folder contains all the files related to the MVC pattern and where we write business logic
│   ├── app/
│   ├── lib/
│   │   │   # In this folder we can write Rake files to specify some tasks and then run them from console using rails
│   │   └── tasks/
│   │   # Here we store configuration files such as the routes of our application
│   └── config/
├── frontend/
│   └── src/
│       │   # Next.js App router
│       ├── app/
│       │   # Here we store re-usable components and also Shadcn components.
│       ├── components
│       └── lib/
│           ├── types/
│           │   # In this file we store functions which hit the backend API endpoints as well as some utility functions to transform data and use it within the frontend project.
│           └── api.ts
│   # And finally, here we save files related to documentation, in this case, the database schema.
└── docs/
```

## Run Project Locally

In order to get the project up an running after cloning the repo we need to follow the next steps:

```sh
cd backend
bundle install
rails db:create
rails db:migrate
```

With the above commands we install the ruby project dependencies, create the database and run migrations.

```sh
rails features:sync
```

Then we need to run the features synchronization task to get the data from the external source and persist it into the database.

Once we have the database ready to use we just need to start our server. And **we need start the api server berfore starting the client/frontend** project to avoid rails complaining about the port is already being used. So to get the server running:

```sh
rails server
```

With that part done, we can address the frontend setup. So, in another terminal we need to go to the root of the project, assuming that we are still in the backend folder: 

```sh
cd ..
cd frontend
npm install
```
The above commands will install the typescript project dependencies and we are ready to start the client server like so:

```sh
npm run dev
```
