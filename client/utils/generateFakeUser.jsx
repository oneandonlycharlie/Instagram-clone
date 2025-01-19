/*  step 1: decide what data I need as user - DONE
    step 2: write a generate random user function that returns full info of a user, only ONE - DONE
    step 3: apply those data to the web page
    step 4: write a function for random recommendations
    step 5: connect front end to back end, write these fake data into data base */

import { faker } from '@faker-js/faker'

function generateRandomPost(userName){

    return {
        id: faker.number.int(),
        image:faker.image.url(),
        description: faker.lorem.paragraph(),
        noOfLikes: faker.number.int({min:0,max:1000}),
        postTime: faker.date.recent({days:10}).toDateString(),
        postedBy:userName
    }
}

function generateRandomUser(num=5){

    const userName = faker.person.fullName()
    const generatePosts = (userName,num)=>{
        let posts = [];
        for (let i=0; i < num; i++){
            posts.push(generateRandomPost(userName))
        }
        return posts
    }

    return {
        userName,
        id: faker.number.int(),
        avatar: faker.image.avatar(),
        bio:faker.person.bio(),
        noOfFollowers: faker.number.int({min:0, max:10000}),
        noOfFollowees:faker.number.int({min:0, max:10000}),
        posts: generatePosts(userName,num),
    }
}

function generateUsers(num){
    if (num == 1){
        return generateRandomUser()
    }
    let userList =[];
    for (let i=0; i<num; i++){
        userList.push(generateRandomUser())
    }
    return userList
}

export {generateUsers};