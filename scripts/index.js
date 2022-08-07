
const { posts } = require("../models")
const { users } = require("../models")

async function testOne(){
    try {
        const findPosts = await posts.findAll()

        console.log({findPosts});
    } catch (error) {
        console.log({error});
    }
} 

testOne()