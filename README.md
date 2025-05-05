# PostPalace - A Full Stack Blogging Web Application

![GitHub repo size](https://img.shields.io/github/repo-size/VishnuPratapGit/PostPalace)
![GitHub stars](https://img.shields.io/github/stars/VishnuPratapGit/PostPalace?style=social)
![GitHub forks](https://img.shields.io/github/forks/VishnuPratapGit/PostPalace?style=social)

PostPalace is a fully responsive blogging website, built using React and Appwrite as backend service.

## Demo

- [Live Demo](https://postpalace.netlify.app)

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Rich text editor for creating blog content
- Responsive design for mobile and desktop
- Dark and light theme modes based on users device

## Screenshots

![Home Page](link-to-screenshot1)
![Blog Post](link-to-screenshot2)
![Edit Blog Page](link-to-screenshot3)

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Appwrite
- **Deployment:** Netlify
- **Text Editor:** TinyMCE
- **State Management:** Redux

## How to upload blog

- First login to upload any post.
- Now click on add post in navbar.
- Add Title, Image, and status ( should be active for public the post else it's private).
- Now add content and click on submit.
- You can update or delete your post by click on update icon in post thumbnail corner.

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/VishnuPratapGit/PostPalace.git

2. Navigate to the project directory
   ```bash
   cd PostPalace

3. Install dependencies
   ```bash
   npm install
   
4. Start the development server
   ```bash
   npm run dev

**Note** Get appwrite project URL and ID also database and bucket ID from appwrite console and put direclty in config file in src>config>config.js or use .env seperatly.
