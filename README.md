# Contacts System
The system manages a list of contacts where authenticated users can perform the following actions:

- Add: Users can create new contacts.
- Edit: Users can modify existing contacts. Any changes made are immediately reflected in the contact list visible to other users.
- Delete: Users can remove contacts from the system.

All updates are synchronized across users to ensure consistency in the contact list.

# Folders
Each folder includes a README file with detailed requirements and installation instructions.

The project is organized into the following folders:

- backend: Contains all backend-related files and code.
- frontend: Contains all frontend-related files and code.

# Postman collection
You can install the Postman collection from [Contacts System Collection](./ContactsSystem.postman_collection.json)

# Docker
You can run each application using Docker by navigating to its respective folder, or you can use Docker Compose to run the entire stack.

Start Docker Compose
> docker-compose up -d

Backend URL
> http://localhost:8000

Frontend URL
> http://localhost:5000