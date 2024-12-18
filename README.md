# MovieHive Client

## Project Description
MovieHive is a single-page React application for browsing and managing a personalized list of movies. The app includes the following features:

- **Login and Signup:** Users can log in with an existing account or sign up for a new one.
- **Main View:** Displays a list of movies fetched for authenticated users. The main view controls routing within the app.
- **Movie Details:** Users can click on a movie to see detailed information, add it to their favorites, or remove it from their favorites.
- **Profile View:** Users can edit their email and birthday, manage their list of favorite movies, or delete their account.
- **Navigation Bar:** Provides easy access to the profile view and logout functionality.

## Key React Components
- **LoginView:** Handles user login.
- **SignupView:** Enables user registration.
- **MainView:** Controls routes and fetches the movies for logged-in users.
- **MovieCard:** Displays movie details and allows users to add or remove movies from their favorites.
- **MovieView:** Manages the list of movies.
- **NavigationBar:** Facilitates navigation between views and includes logout functionality.
- **ProfileView:** Allows users to update their profile and manage their favorite movies.

## Dependencies
The project leverages the following dependencies:

```json
{
  "dependencies": {
    "bootstrap": "^5.3.3",
    "prop-types": "^15.8.1",
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.6",
    "react-dom": "^18.3.1",
    "react-router": "^7.0.2",
    "react-router-dom": "^7.0.2"
  },
  "devDependencies": {
    "@parcel/transformer-sass": "^2.13.2",
    "process": "^0.11.10"
  }
}
```

## Testing the Project with Parcel
Follow these steps to test the project locally:

1. **Install Parcel (if not already installed):**  
   Ensure you have [Parcel](https://parceljs.org/) installed globally. You can install it using the following command:  
   ```bash
   npm install -g parcel-bundler
   ```

2. **Run the Development Server:**  
   Navigate to the project folder in your terminal and start the server using Parcel. Replace **[path/to/index.html]** with the actual relative path to your **index.html** file:
   ```bash
   parcel [path/to/index.html]
   ```
   For example, if your **index.html** file is in the project root folder, you can run:
   ```bash
   parcel ./index.html
   ```

3. **Open the App in Your Browser:**  
   Once the Parcel server starts, it will typically serve the app at [http://localhost:1234](http://localhost:1234). Open this link in your browser to view and test the project.

4. **Stop the Server (Optional):**  
   To stop the Parcel server, press **Ctrl + C** in the terminal.

## Features Overview
- **Authentication:** Secure login and signup functionality.
- **Dynamic Movie Management:** Add or remove movies from your favorites directly from the movie card view.
- **User Profile:** Update personal information and manage favorite movies efficiently.
- **Responsive Design:** Built using Bootstrap and React-Bootstrap for a mobile-friendly experience.

