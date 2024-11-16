# indestructiblefive_acronymfinder

<img width="955" alt="image" src="https://github.com/user-attachments/assets/30550a8b-5a79-4554-97d0-f6f414d54431">

Before you start making changes, please make sure you are on a newly-created branch for your changes to avoid conflicts with the other developer. 

The project structure is quite straightforward, folder 'backend' is for the Flask API and folder 'client' is for the React frontend. The part that might not be so apparent to this repository is the mysql database, whose image is pulled from Docker and filled with our acronyms once the build is complete (Yay!).

To deploy the app on Docker, you will need: 
1. Download Docker Desktop https://docs.docker.com/get-started/introduction/get-docker-desktop/
2. Create a new branch (if you need to make changes) and clone the project to a local reposity of choice 
3. On your IDE (preferably VS Code), open the terminal and do: docker-compose up --build
4. Follow the console log to see if the build's finished or runs into any error. 
5. If you want to remove the created Docker containers, do: docker-compose down
6. (optional) Install Docker extension on VS Code for docker compose start/stop. 

Feel free to ask questions or share cool tricks/videos to the group's Discord server!
