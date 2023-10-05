// Get the form and input elements
const userForm = document.getElementById('user-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Get the element to display stored user details
const userDetailContainer = document.getElementById('user-details');

// Listen for form submission
userForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get user input values
    const name = nameInput.value;
    const email = emailInput.value;

    // Create a user object
    const user = {
        name: name,
        email: email
    };

    // Retrieve existing users or initialize an empty array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    storedUsers.push(user);

    // Store the updated array in local storage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // Clear the form inputs
    nameInput.value = '';
    emailInput.value = '';

    // Update the displayed user details
    displayStoredUsers();
});

// Function to display stored user details
function displayStoredUsers() {
    userDetailContainer.innerHTML = ''; // Clear previous entries

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.length === 0) {
        userDetailContainer.innerHTML = 'No user data found in local storage.';
        return;
    }

    storedUsers.forEach((user, index) => {
        const userDetail = document.createElement('div');
        userDetail.classList.add('user-detail');
        userDetail.innerHTML = `
            <p><strong>Name:</strong> <span>${user.name}</span></p>
            <p><strong>Email:</strong> <span>${user.email}</span></p>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        userDetailContainer.appendChild(userDetail);
    });

    




// By mistake you have added thw wrong email id. 
// Lets edit and fix it.

// ...

// Function to display stored user details
function displayStoredUsers() {
    userDetailContainer.innerHTML = ''; // Clear previous entries

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (storedUsers.length === 0) {
        userDetailContainer.innerHTML = 'No user data found in local storage.';
        return;
    }

    storedUsers.forEach((user, index) => {
        const userDetail = document.createElement('div');
        userDetail.classList.add('user-detail');
        userDetail.innerHTML = `
            <p><strong>Name:</strong> <span>${user.name}</span></p>
            <p><strong>Email:</strong> <span class="stored-email">${user.email}</span></p>
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        userDetailContainer.appendChild(userDetail);
    });

    // Add event listeners to edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editStoredUser(index);
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteStoredUser(index);
            displayStoredUsers();
        });
    });
}

// Function to edit a stored user's email
function editStoredUser(index) {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers[index];
    
    if (!user) {
        return;
    }

    const newEmail = prompt(`Edit email for ${user.name}:`, user.email);

    if (newEmail !== null) {
        // Update the email in the user object
        user.email = newEmail;

        // Update the array and store it in local storage
        storedUsers[index] = user;
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Re-display the user details
        displayStoredUsers();
    }
}

// ...
