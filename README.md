<div align="center">
  <h1>Picatso</h1>
Create cat art with DALLE-2 and share them. Explore a gallery of cat art created by the community.

<img src="/public/screengrab.png">

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">

</div>

## About

Picatso is a full-stack wb app that generates picture of adjective cats doing verbs. You must be logged in to generate new feline friends, but when you are logged in, you can also view the cats produced by other users, and like the ones you find cute or interesting. You can also view your own cats.

I built this project using the t3-stack. If you don't know what t3-app is, it is kind of like create-react-app, just designed for Next.js. You can do it too by running npm create t3-app@latest (I used pnpm). The specific parts I used were Next.js, Tailwind, and TRPC. t3 also comes pre-configured with Zod and React Query. I used Cloudinary to host the generated images. To store meaningful data and the links to the images, I used Supabase's database. I let Auth0 handle the authentication layer.

This was my first project using the t3-stack, which is a type-safe and DX focused stack using Next.js, Prisma, Tailwind, TRPC, and Next Auth. I spent a lot of time watching videos on TRPC and how the parts matched together, burning a lot of time considering I started with around 24 hours left.

I ran into a lot of issues with Prisma, as I haven't used since October and the ESLint rules that t3-stack introduced to me made me rethink a lot of things. I eventually pivoted off Prisma and Next Auth to Supabase and Auth0, but I will make a project with the former in the future.

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm run dev` to start the development server.
5. Visit `http://localhost:3000` in your web browser to view the application.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
