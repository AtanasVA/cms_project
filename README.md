# My custom type-safe CMS

Not yet fully completed as more things are needed to be done, like for example:

- [x] Create Homepage with a Grid displaying all created pages in the database. Each grid row should have the title displayed as well as an Edit and Delete button
- [x] Add a header with an Add Page button to allow the user to create new pages via a custom modal. The same modal should be used for the Page edit.
- [x] Install and setup Prisma and the docker-compose file.
- [x] Ensure no duplicate slugs can be added to the database. Each page should have its unique slug.
- [x] Add basic error handling
- [x] Add new posts table and create a relation between pages and posts
- [x] Add FE functionality allowing the user to create, edit and delete posts for each page.
- [x] Add CRUD queries for the posts and link them with the scaffolded FE functionality

- [ ] Add pagination for the created pages and page content
- [ ] Add advanced error handling. A toast with the error returned from the server will be a nice touch
- [ ] Add form validation on the modals using [Zod](https://zod.dev/)
- [ ] Possibly add [Formik](https://formik.org/) or [React Hook Form](https://react-hook-form.com/) to handle the form submissions more gracefully
- [ ] Improve the type-safety of the queries
- [ ] Sanitize codebase and abstract components such as Grid, Header..

## Tech used

Project bootstrapped with [T3 Stack](https://create.t3.gg/)

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Bootstrap CSS](https://getbootstrap.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Docker](https://www.docker.com/)

## How do I make this start?

Pretty straightforward I have to say.

Ensure you're using the latest node version (the project is built with v18.17.0 )

```
nvm use
```

Install all dependencies

```
npm install
```

You'll need Docker to spin up the container with the MySQL database so I'll suppose you already have that installed. If yes - start it up and proceed with

```
docker compose up
```

Note: You can also use DBeaver to monitor your database behavior.

Don't forget to copy the env.example to a .env file and update the DATABASE_URL with your details ( if you're using different ones that is ).

Once all of that is rolling you'll need to generate your prisma client and run the prisma migrations:

```
npx prisma generate
```

```
npx prisma migrate dev
```

And that should be it. Run

```
npm run dev
```

and should be able to access the project locally and create/update and delete CMS pages.

## Sample screenshots

![Screenshot 2024-05-21 at 1 42 26](https://github.com/AtanasVA/cms_project/assets/99086114/787b9532-2c04-465f-873e-ec3bd135d898)
![Screenshot 2024-05-21 at 1 42 14](https://github.com/AtanasVA/cms_project/assets/99086114/68f64800-17ab-45c8-be8c-4a913fdc720b)
![Screenshot 2024-05-21 at 9 18 42](https://github.com/AtanasVA/cms_project/assets/99086114/78def21d-9abb-4890-a079-e5f83a920fff)
