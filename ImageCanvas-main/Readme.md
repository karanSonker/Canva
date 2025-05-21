canvaImage
This project is a simple image editor built with React and Fabric.js. It allows users to upload an image into a canvas area with a fixed frame (called a stencil). The image is scaled to match the canvas width, and users can zoom in, zoom out, or reset the image.

Features Responsive Canvas: The canvas resizes automatically based on your screen size.

Single Image Display: Only one image is shown at a time. Uploading a new image removes the previous one.

Fit Image to Canvas Width: When an image is uploaded, it is scaled so that its width exactly fits the canvas.

Zoom In/Out: Users can zoom into or out of the image using buttons.

Reset Button: Resets the image to its original scale and position.

Redux Integration: Image scale and position are stored in Redux for state management.

How it Works Canvas Setup: A Fabric.js canvas is created and resized to fit the screen.

Stencil Frame: A rectangle is added to the canvas as a frame. The image is clipped inside this frame.

Image Upload:

The image is scaled to match the canvas width.

It's centered inside the stencil.

If another image was already present, it is removed.

Zoom & Reset:

Zoom buttons increase or decrease the image size.

The reset button returns the image to its initial scale and position.

How to Use Upload an image using the file input.

Use the Zoom In, Zoom Out, or Reset buttons to interact with the image.

Upload a new image to replace the old one.
Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
