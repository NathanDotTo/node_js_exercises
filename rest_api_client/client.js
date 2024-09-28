#!/usr/bin/env node

const axios = require('axios');

// GET all users
async function getAllUsers() {
    try {
        const response = await axios.get(`http://localhost:3000/users`)
        console.log(`All Users:`, response.data);
    } catch (error) {
        console.error(`Error in getAllUsers()`, error)
    }
}

// GET user by ID (e.g., ID = 1)
async function getUserById(id) {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`)
        console.log(`User for id ${id}:`, response.data);
    } catch (error) {
        console.error(`Error in getUserById(${id})`, error)
    }
}

// POST a new user
async function createUser(name) {
    const newUser = {
        name: name
    };
    
    let newUserID = -1
    try {
        console.log(`newUser:`, newUser)
        const response = await axios.post(`http://localhost:3000/users/`, newUser)
        newUserID = response.data
        console.log(`Created new user with id:`, newUserID)
    } catch (error) {
        console.error(`Error in createUser(${name})`, error)
    }
    return newUserID
}

// Call the functions

async function test() {
    getAllUsers();
    getUserById(1);
    // To deliberately show what errors look like
    getUserById(10);
    let newUserID = await createUser('Charlie');
    getUserById(newUserID);
}

test()
