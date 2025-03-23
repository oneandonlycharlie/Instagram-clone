
const { faker } = require('@faker-js/faker')

// user seed to produce consistent data
faker.seed(123);

function generateRandomPost(userName){

    return {
        // id: faker.number.int(),
        image:faker.image.urlPicsumPhotos({height:faker.number.int({min:400,max:700}), blur:0}),
        description: faker.lorem.paragraph(),
        noOfLikes: faker.number.int({min:0,max:1000}),
        postTime: faker.date.recent({days:10}).toDateString(),
        postedBy:userName
    }
}

const generatePosts = (userName, num)=>{
    if (num==1){
        return generateRandomPost
    }
    let posts = [];
        for (let i=0; i < num; i++){
            posts.push(generateRandomPost(userName))
        }
        return posts
    }

function generateRandomUser(){

    return {
        loginName:null,
        password:null,
        userName:faker.person.fullName(),
        // id: faker.number.int(),
        avatar: faker.image.avatar(),
        bio:faker.person.bio(),
        noOfFollowers: faker.number.int({min:0, max:10000}),
        noOfFollowees:faker.number.int({min:0, max:10000}),
        isDemoUser: true,
    }
}

function generateUsers(num){
    let userList =[];
    for (let i=0; i<num; i++){
        userList.push(generateRandomUser())
    }
    return userList
}

function generateDefaultUser(){

    return {
        userName: 'New User' + faker.number.int({min:0, max:10000}),
        avatar: "https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ",
        bio:'You don\'t have a bio yet ',
        noOfFollowers: 0,
        noOfFollowees:0,
        isDemoUser: false,
    }
}


module.exports = { generateUsers, generatePosts, generateDefaultUser };