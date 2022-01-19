# inventory-management
Stack Used: Fullstack Javascript

```
Backend:      Node.js
Frontend:     React.js
Node version: 17.3.1 
NPM version:  8.3.0 
NPX version:  8.3.0 
```

Steps:

1. Install NPM and Node in accordance with the versions given above.
2. Set up the `.env` files in both `/server` and `/client` using `sample.env` in each as a reference.
3. Give the file "runProject.sh" and "buildProject.sh execution permission:
```
               chmod +x runProject.sh
               chmod +x buildProject.sh
```
4. Build the project and install dependencies:
```
    npm run build
```
5. Run it using either of the following commands:
```
    a. npm run start
    b. ./runProject.sh
```

The react client will be available at `http://localhost:3000` and the Node.js + Express server will be available at `http://localhost:{{PORT_SETUP_IN_.ENV}}`.


## Backend

I used Node.js because it has faster development time, requires less setup, and has ample community support. The express framework made it easy to create API endpoints quickly with minimal code. The code structure used will help maintain code readability as it scales later on in the project.


TODO: Add testing using mocha framework
