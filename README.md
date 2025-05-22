## **1. Project Overview**

This project is a full-stack **MERN (MongoDB, Express.js, React, Node.js)** application designed as a functional clone of a social media platform—**Twitter** . It enables users to post content, interact with other users, and manage their profiles in a user-friendly environment.

The primary goal of this project is to demonstrate practical knowledge of full-stack development, including state management, API integration, authentication, and database operations. It is built for learning, experimentation, and as a showcase of modern web development skills.

### **Main Features:**

- **User Authentication:** Secure user registration and login with protected routes.
- **Profile Management:** View, edit, and update user profile information and profile pictures.
- **Post Functionality:**
    - Create, view, and delete text or image-based posts.
    - Like, comment on, and save posts for later viewing.
- **User Interaction:**
    - Follow or unfollow other users to see their content.
    - View posts from followed users in a personalized feed.
- **Notifications:** Real-time alerts for interactions like follows and post engagement.
- **User Experience Enhancements:**
    - Toast notifications for feedback (e.g., success, error).
    - Loading indicators for async operations.
    - Responsive and accessible UI built with modern design practices.
    

---

## **2. Technologies Used**

**Frontend:**

- **React** – JavaScript library for building dynamic user interfaces.
- **React Router** – Handles client-side routing for a seamless SPA (Single Page Application) experience.
- **React Query** – Manages server state and handles API caching, fetching, and updates.
- **Tailwind CSS** – Utility-first CSS framework for rapid and responsive UI design.
- **DaisyUI** – A Tailwind-based UI component library for clean and accessible design.
- **React Icons (FontAwesome, Lucide, etc.)** – Used for intuitive and recognizable UI icons.

**Backend:**

- **Node.js** – JavaScript runtime environment for building fast and scalable server-side applications.
- **Express.js** – Web framework for creating RESTful APIs and handling HTTP requests.
- **MongoDB** – NoSQL database for storing users, posts, and other app data.
- **Mongoose** – ODM (Object Data Modeling) library for interacting with MongoDB.
- **Cloudinary** – Image hosting service for uploading and managing post images.
- **Cookie-Parser** – Middleware for handling HTTP cookies (used in auth flows).
- **JSON Web Token (JWT)** – Handles secure authentication via tokens.

**Dev Tools:**

- **Vite** – Fast front-end build tool and development server optimized for React.
- **Postman** – API testing tool used for debugging and validating backend endpoints.
- **Git & GitHub** – Version control and collaboration platform for code management.

## **3. Setup Instructions**

### **Backend Setup:**

1. Clone the repository:
    
    `git clone https://github.com/chieyo/Twitter-Clone.git`
    
2. Navigate to the backend folder:
    
    `cd .\backend\`
    
3. Install dependencies:
    
    `npm install express mongoose jsonwebtoken bcryptjs dotenv cors cookie-parser cloudinary` 
    
    `npm install -D nodemon`
    
    - Packages
        - express → to create API
        - mongoose → to be able to interact with the mongoDB database
        - jsonwebtoken → for authentication
        - bcryptjs → to hash passwords
        - dotenv →to read/create content of the .env files
        - cors →to get rid of the cors errors
        - cookie-parser →to get the cookies from the request
        - cloudinary →to upload images for free
4. Create a `.env` file and add the following:
    - Open MongoDB and get the database URL
    - Set a Port number to run the website
    - Open Git Bash to get JWT_SECRET value
        
        `$ openssl rand -base64 32`
        
    - Open Cloudinary account and get the Cloud Name, API Key, and API Secret
    
    ```
    MONGO_URI=mongodb+srv://cheerio:Cheerio_0021@cluster0.t7jzob8.mongodb.net/Twitter_clone-db?retryWrites=true&w=majority&appName=Cluster0
    PORT=4000
    JWT_SECRET=J4d5bXfFKzIi8b6JkVd9fYgHIryFkwVJNrG4fWySKzA=
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=drdhjmk07
    CLOUDINARY_API_KEY=133487288863628
    CLOUDINARY_API_SECRET=SYLLs0CazuN_NVdNzui82542Fb0
    ```
    
5. Start the backend server:
    
    `npm run dev`
    

### **Frontend Setup:**

1. Navigate to the frontend folder:
    
    `cd ./frontend/`
    
2. Install dependencies:
    - Tailwindcss with Vite
        
        `npm install -D tailwindcss@3 postcss autoprefixer` 
        
        `npx tailwindcss init -p`
        
        `npm run dev`
        
    - Daisy UI
        
        `npm install -D daisyui@4.10.2` 
        
    - Tan stack Query
        
        `npm i @tanstack/react-query`
        
    - React Hot Toast
        
        `npm install react-hot-toast`
        
3. Start the development server:
    
    `npm run dev`
    

---

## **4. Folder Structure**

### **Backend:**

- **`controllers/`**
    
    Contains the core business logic for handling HTTP requests.
    
    Example: Creating a post, following users, and processing likes/comments.
    
- **`models/`**
    
    Defines the Mongoose schemas and models for MongoDB collections.
    
    Examples: `User.model.js`, `Post.model.js`.
    
- **`routes/`**
    
    Declares RESTful API endpoints and maps them to corresponding controller functions.
    
    Routes include: `auth`, `users`, `posts`, `saves`, and `notifications`.
    
- **`middleware/`**
    
    Contains reusable logic applied before request handlers.
    
    Example: `protectRoute.js` uses JWT to authenticate users.
    
- **`database/`**
    
    Contains database connection logic to initialize MongoDB with Mongoose.
    
    Example: `connectMongoDB.js`.
    

### **Frontend:**

- **`components/`**
    
    Holds reusable UI elements used across pages.
    
    Examples: `Sidebar`, `RightPanel`, `LoadingSpinner`, `Skeleton`, etc.
    
- **`hook/`**
    
    Custom React hooks for encapsulating reusable logic.
    
    Example: A hook to update user profile info with side effects.
    
- **`pages/`**
    
    Examples: `Home`, `Login`, `SignUp`, `Profile`, `Saved`, `Notifications`.
    
    Represents the main views/screens of the app.
    
- **`utils/`**
    
    Utility functions for common tasks and logic.
    
    Example: `index.js` to display human-readable timestamps.
    
- **`public/`**
    
    Static assets accessible directly in the browser.
    
    Examples: App logo, default user icon, and other media.


## **5. Code Explanation**

### Backend:

- **MongoDB** – database
- **Express.js** – backend framework
- **React.js** – frontend UI library
- **Node.js** – JavaScript runtime

**Routes:**

- Each route is linked to a specified route.js so for example `“/api/posts”` refers to the post.route.js that also have protected routes. The post routes is triggers the `post.controller.js`  functions
    - `/api/auth` - Login, Sign up user
    - `/api/users` - Get and update user profile, followership
    - `/api/posts` - Create, delete, like, and comment on post
    - `/api/notifications` - Display and delete notifications
    - `/api/saves` - Display saved posts

**Controllers:**

- `auth.controller.js` - signUp, login, logout, and getMe(fetches authenticated user)
- `user.controller.js` - getUserProfile, followership, getSuggestedUsers, updateUser
- `post.controller.js` - createPost, deletePost, postComment, likeUnlikePost, getAllPosts, getLikedPosts, getFollowing posts, getUserPosts
- `notification.controller.js` - getNotification, deleteNotification
- `saves.controller.js` - getSavedPosts, savePost

**Models:**

Contains database schemas

- `user.model.js`
    - username, fullName, age, password, email, followers[], following, coverImg, profileImg, bio, link, likedPosts[], savedPosts[]
- `post.model.js`
    - user, text, img, likes, comment[], saves[]
- `notification.model.js`
    - from, to, type(”follow”,”like”), read

**Middleware:**

- `protectRoute.js` - JWT middleware to protect private routes.

**Database:**

- `connectMongoDB.js` - Initializes MongoDB connection using Mongoose.

### Frontend:

- **React** – UI
- **Tailwind CSS + DaisyUI** – Styling
- **React Router** – Routing
- **React Query** – Data fetching and caching
- **React Icons / FontAwesome** – Icons
- **Vite** – Dev server and bundler

**Components:**

- /Common/
    - `LoadingSpinner.jsx` - Loading animation when status isPending
    - `Post.jsx` - Single Post element
    - `Posts.jsx` - Fetches posts for the feeds
    - `RightPanel.jsx` - Fetches the suggested users
    - `SideBar.jsx` - Displays the web navigation
- /skeletons/ - contains skeletons for elements when in isPending status.

**Hooks:**

- `useFollow.jsx` - Follow/unfollow users logic for followership
- `useUpdateUserProfile.jsx` - Handles profile edits

**State Management & Data Fetching:**

- Uses **React Query**:
    - `useQuery()` – Fetch data (e.g., posts, auth user)
    - `useMutation()` – Trigger updates (e.g., like, comment, post)
    - `queryClient.invalidateQueries()` – Refetch updated data

    ## **6. Challenges Faced**

- **Outdated Packages in Tutorial**
    
    The tutorial used older versions of several dependencies. To match the code in the video, I had to uninstall recent packages and manually install the outdated ones, which caused version compatibility issues.
    
- **Unresolved Bug in Likes Tab**
    
    When visiting another user's profile, the "Likes" tab incorrectly displays the currently logged-in user's liked posts instead of the intended user's. This needs further debugging.
    
- **Performance Issues**
    
    My laptop experienced significant lag during development, especially when running both the backend and frontend servers simultaneously. This slowed down progress and testing.
    
- **Package Installation Errors**
    
    Several issues were encountered during npm install, such as peer dependency warnings and installation failures. These were resolved by searching the solutions in the internet.
    

---

## **7. Future Improvements**

- **Enhance Web Responsiveness**
    
    Optimize the UI for various screen sizes, especially for mobile and tablet devices, to improve user experience across platforms.
    
- **Interactive Comments and Likes**
    
    Implement smooth animations for comment submissions and like/unlike actions to make the app feel more dynamic and responsive.
    
- **Repost/Share Functionality**
    
    Add the ability for users to repost or share others’ content to their own feed, similar to Twitter's retweet or Instagram's share feature.
    
- **User Customization Settings**
    
    Introduce a settings panel where users can personalize their experience—such as theme selection (dark/light mode), font size, or notification preferences.
    

---

## **8. Screenshots**

🤖 Login/Sign Up Page

![Screenshot 2025-05-22 044622.png](attachment:5cba6ddb-bda5-4a59-9113-87aefb0e4676:Screenshot_2025-05-22_044622.png)

🤖 Notification Page

![Screenshot 2025-05-22 044933.png](attachment:f39d3bfb-2de3-4313-aeeb-cac0ded265a2:Screenshot_2025-05-22_044933.png)

🤖 Saved Page

![Screenshot 2025-05-22 045003.png](attachment:4e5b5261-7ba3-4758-a593-36fef72e3eb6:Screenshot_2025-05-22_045003.png)

Filler Only

![zoroPost.jpg](attachment:46041109-bb90-4dd2-87f9-e35c4ab353ec:zoroPost.jpg)

🤖 Home Page — For You Tab

![Screenshot 2025-05-22 044641.png](attachment:81bfb3cd-ac4d-42fc-bde8-763452b3e2c6:Screenshot_2025-05-22_044641.png)

🤖 Home Page — Following Tab

![Screenshot 2025-05-22 044700.png](attachment:986b5176-99fd-4fb5-9ff7-413fa147e00b:Screenshot_2025-05-22_044700.png)

🤖 Profile Page — Post Tab

![Screenshot 2025-05-22 045021.png](attachment:f886cbbe-f267-43aa-b574-97829dd8ed87:Screenshot_2025-05-22_045021.png)

🤖 Profile Page — Likes Tab

![Screenshot 2025-05-22 045049.png](attachment:956fed93-a845-41a6-8c51-4d24ecb37ffa:Screenshot_2025-05-22_045049.png)

---

## **10. Others**

### Sources:

https://github.com/burakorkmez/twitter-clone

https://tailwindcss.com/docs/installation/using-vite

https://v4.daisyui.com/docs/install/

https://tanstack.com/query/latest/docs/framework/react/installation

https://react-hot-toast.com/

https://react-icons.github.io/react-icons/