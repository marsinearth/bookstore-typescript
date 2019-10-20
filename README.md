# BookStore

> written with React(hooks and context), React Router, TypeScript and AWS-Amplify

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### [Hosted Demo Website](http://bookstore-typescript-20191020004739-hostingbucket-dev.s3-website.ap-northeast-2.amazonaws.com/)

applied with AWS-Amplify, there is demo site.

## Plans forward

&#9745; Simple BookStore with React Functional Components with hooks

&#9745; using [react context](https://ko.reactjs.org/docs/context.html) to manage states rather than using [useState](https://ko.reactjs.org/docs/hooks-reference.html#usestate) in the most top hierarchical functional component and descend state props to the bottom.

&#9745; use react-router-dom to separate pages, especially [cart](https://github.com/marsinearth/bookstore-typescript/blob/master/src/pages/cart.tsx) and [bookDetail](https://github.com/marsinearth/bookstore-typescript/blob/master/src/pages/bookDetail.tsx), and use [react-router hooks](https://reacttraining.com/react-router/web/api/Hooks) to interact among routes.

&#9745; Attach [AWS-Amplify](https://aws-amplify.github.io/docs/js/react) to easily back up the functionalities of backend; do the Sign-in functionality with [Google with the Amplify auth class](https://aws-amplify.github.io/docs/js/authentication#oauth-and-federation-overview).

&#9744; Attach [Amplify API for backend using GraphQL](https://aws-amplify.github.io/docs/js/react#add-graphql-backend) to alter [the hard-coded book data](https://github.com/marsinearth/bookstore-typescript/tree/master/src/assets/data)

&#9744; try to manage GraphQL subscription for possible chatting system and product number change in the cart

...to be continued
