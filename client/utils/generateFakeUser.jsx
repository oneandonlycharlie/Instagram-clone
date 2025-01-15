/*  step 1: decide what data I need as user - DONE
    step 2: write a generate random user function that returns full info of a user, only ONE - DONE
    step 3: apply those data to the web page
    step 4: write a function for random recommendations
    step 5: connect front end to back end, write these fake data into data base */

import { faker } from '@faker-js/faker'

function generateRandomUser(num=5){

        
    const generatePosts = (num)=>{
        let posts = [];
        for (let i=0; i < num; i++){
            posts.push(generateRandomPost())
        }
        return posts
    }

    return {
        userName: faker.person.fullName(),
        id: faker.number.int(),
        avatar: faker.image.avatar(),
        bio:faker.person.bio(),
        noOfFollowers: faker.number.int({min:0, max:10000}),
        noOfFollowees:faker.number.int({min:0, max:10000}),
        posts: generatePosts(num),
    }
}

function generateRandomPost(){

    return {
        id: faker.number.int(),
        image:faker.image.url(),
        description: faker.lorem.paragraph(),
        noOfLikes: faker.number.int({min:0,max:1000}),
        postTime: faker.date.recent({days:10})
    }
}

export default generateRandomUser;