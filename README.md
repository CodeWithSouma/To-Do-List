# To-Do-List
A simple javaScript based web application you can use it to manage to-do-list

![](https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783676_960_720.png)

## Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Clone the repositories

**USING HTTPS**

    git clone https://github.com/CodeWithSouma/To-Do-List.git

**USING SSH**

    git clone git@github.com:CodeWithSouma/To-Do-List.git

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Start the Server

    node app.js

This will launch the Node server on port 3000. If that port is busy, you can set a different port in app.js.

Open up your browser and head over to:

http://localhost:3000/

You should see the to-do-list. That confirms that you have set up everything successfully.

If you want to create your custom list for example work list you have to pass a parameter like this

http://localhost:3000/work
