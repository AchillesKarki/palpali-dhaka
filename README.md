# Palpali Dhaka

## [Live Site](https://palpali-dhaka.netlify.app/)

## Introduction

This is a `React-Redux` e-commerce project developed for the online showcasing and purchase of "Dhaka" products which uses `Firebase` as a backend service.<br />
Dhaka is traditional hand made fabric which are produced in various parts of Nepal, with "Palpa" district being one of the most famous ones. The hand-spun cotton inlay-pattern weaving used to make intricately patterned, colorful panels for Dhaka topis, is the most remarkable and visible cotton textile in Nepal. Pre-dyed cotton is weaved by master craftspeople into intricate patterns using only a few colours. The fabric is also used for a type of blouse called Dhaka ko Cholo, literally meaning a "blouse made of dhaka fabric", and shawls for women.

## Application Highlights

- `React Hooks`
- `Firebase` CRUD operations
- `Redux` integration for better state management
- User authentication and authorization
- Cart system, to store the products
- Payment mechanism with both `Stripe` and `PayPal` gateways
- `Netlify Forms` for serverless form submission
- `Netlify` deployment
- Interactive UI
- `Sass` as CSS preprocessor
- Mobile Responsive

## Libraries Used

- [Node SASS](https://github.com/sass/node-sass) is used to natively compile .scss files to css
- [Firebase](https://firebase.google.com/) is used as backend for the project
- [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) are used for handling forms and the form validations
- [React Dropdown Select](https://sanusart.github.io/react-dropdown-select/) is used as dropdown component for UI along with custom dropdowns
- [React Modal](https://github.com/reactjs/react-modal) is used as modal component for UI
- [React Tabs](https://reactcommunity.org/react-tabs/) is used as tabs component for UI
- [Redux](https://redux.js.org/) and [React Redux](https://react-redux.js.org/) for state management
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) for redux side effects logic including both synchronous and asynchronous requests
- [Redux Logger](https://github.com/LogRocket/redux-logger) is used as logger for Redux
- [Reselect](https://github.com/reduxjs/reselect) is used as “selector” library for Redux

## Netlify

- [Netlify](https://www.netlify.com/) is used for hosting the application to the web. [Netlify CLI](https://cli.netlify.com/) is used to deploy the site for production and other netlify related operations
- [Netlify Forms](https://www.netlify.com/products/forms/) is used in the contact section of the application, for the form submission. It handles the simple contact form submission without having to write any server side code

## Payment

- The application includes [Stripe](https://stripe.com/) and [PayPal](https://www.paypal.com/) payment options
- Since this is a demo project, production keys are not used
- Dummy credentials are provided for both options to the users for mimicking the payment process
- Stripe backend payment handling is not yet done, and will be integrating when `Node-Express` backend is built for the application

## Local Deployment

- Clone the repository or download the source code
- Install the dependencies by running command `npm install` at the root directory of the project
- Run the app in the development mode by running command `npm start`<br />Open http://localhost:3000 to view it in the browser
