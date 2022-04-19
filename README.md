# Tawkify Coding Challenge

## Overview
This app is built using NextJS and React. To deploy locally, refer to the [NextJS README](nextjs-README.md) and run
`yarn dev` in your terminal.

## Rationale
NextJS is now the preferred way of creating React Apps since Create React App is no longer maintained. It also provides
some advantages such as Server Side Rendering and routing out of the box, so that's why it's also my preferred way of
working with React.

NextJS also provides API routes, which I used for creating a RESTful API for saving the list items data. This helped me
to save time as I would have needed to set up a separate server otherwise.

I also chose to use `styled-components` as it's one of the community's preferred choices for embedding CSS-in-JS at the
moment. Styled Components also support server side rendering and they provide a good way of avoiding clashes among CSS
selectors when components are shared and reused throughout an App.

Some global styles in SASS can also be found in the src/styles folder, though. As Styled Components's CSS pre-processor
is a very limited version of SASS, and I also wanted to showcase with this tool, I decided to
put some SCSS files there as well.

The app does not intend to be perfect nor is a production-ready code, but rather a demonstration
of my skills, so you can get the picture.

## Netlify

I deployed the app to https://dashing-syrniki-8beec2.netlify.app/. However, it seems like the RESTful API is not working
there, probably because I didn't use a database but just a simple JSON file to store the data instead,
there may be some filesystem permission issues there. Note that I decided to use this JSON file because it seemed like
the most simple way of persisting data and the task did not require to use any particular database.
