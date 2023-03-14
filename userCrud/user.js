const fs = require('fs');
const yargs = require('yargs');
const uniqid = require('uniqid');
// Define the users file path
const usersFilePath = './users.json';

// Create the users file if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, '[]');
}

// Helper function to read the users file
const getUsers = () => {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  if (!usersData) {
    return [];
  }
  return JSON.parse(usersData);
};

// Helper function to write to the users file
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users));
};

// Add command
yargs.command({
  command: 'add',
  describe: 'Add a new user',
  builder: {
    name: {
      describe: 'User name',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'User email',
      demandOption: true,
      type: 'string'
    },
    password: {
      describe: 'User password',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const users = getUsers();
    const id = uniqid();
    const newUser = {
      id,
      ...argv
    };
    users.push(newUser);
    saveUsers(users);
    console.log(`User with id ${id} has been added`);
  }
});

// Read command
yargs.command({
  command: 'read',
  describe: 'Read a user',
  builder: {
    id: {
      describe: 'User ID',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const users = getUsers();
    const user = users.find((u) => u.id === argv.id);
    if (!user) {
      console.log(`User with id ${argv.id} not found`);
    } else {
      console.log(user);
    }
  }
});

// Update command
yargs.command({
  command: 'update',
  describe: 'Update a user',
  builder: {
    id: {
      describe: 'User ID',
      demandOption: true,
      type: 'string'
    },
    name: {
      describe: 'New user name',
      type: 'string'
    },
    email: {
      describe: 'New user email',
      type: 'string'
    },
    password: {
      describe: 'New user password',
      type: 'string'
    }
  },
  handler(argv) {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === argv.id);
    if (userIndex === -1) {
      console.log(`User with id ${argv.id} not found`);
    } else {
      const newUser = {
        ...users[userIndex],
        ...argv
      };
      users[userIndex] = newUser;
      saveUsers(users);
      console.log(`User with id ${argv.id} has been updated`);
    }
  }
});

// Delete command
yargs.command({
  command: 'delete',
  describe: 'Delete a user',
  builder: {
    id: {
      describe: 'User ID',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const users = getUsers();
    const filteredUsers = users.filter((u) => u.id !== argv.id);
    if (filteredUsers.length === users.length) {
      console.log(`User with id ${argv.id} not found`);
    } else {
      saveUsers(filteredUsers);
      console.log(`User with id ${argv.id} has been deleted`);

    }
  }
});

// Start the application
yargs.parse();