# Chat Time Pals
[![Demonstration](<img width="781" alt="Screenshot 2024-05-02 at 12 47 28 PM" src="https://github.com/DoggoOP/ChatTimePals/assets/80930499/c50798a6-90e9-49d7-bc4a-a8765ebbd57d">)](https://youtu.be/04nApDnSx0E)


## Inspiration
I always found chat gpt interesting and I wanted to do something to explore the API

## What it does
It asks the user what language they speak, so it pre-configures the google cloud translate and text-to-speech to be able to take in the language. It also asks the user who they want to talk to, and I used a prompt to make chat gpt act like said person. Then, for what message you send, it sends an API request to Openai to generate an answer, and that answer is sent to Google Cloud to be translated to your language; then, it is once again sent to Google Cloud to be synthesized into a human-like voice.

## How we built it
I used reactJS.

## Challenges we ran into
I didn't know you couldn't send API requests from a web browser, so I had to send post requests to my new server actually to make the API requests. I may have leaked my API key when uploading to github because I forgot to delete all the console prints I used for debugging so I am trying to fix that.

## Accomplishments that we're proud of
This is my first solo hackathon

## What we learned
How to properly use APIs that have outputs.

## What's next for Chat Time Pals
make the UI nicer, use real speech synthesis so the voice matches the person.

## Built With
google-cloud
openai
react

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# ChatTimePals
# ChatTimePals
