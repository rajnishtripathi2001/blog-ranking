# Blog Ranking System

## packages used
Express, dotenv, Mongoose, cors 

## How to run
1. Clone the repo
2. Run `npm install`
3. Run `npm start`

## How to use
1. Open Postman
2. Create a POST request to `http://localhost:5000/addBlogs`
3. Add the following to the body of the request:
```
{
    "blogId": "bl009",
    "name": "Blog Title",
    "content": "Blog Description",
    "author": "Blog Author",
    "view": 32
}
```
4. Send the request
5. Create a GET request to `http://localhost:5000/blogs`
6. Send the request
7. Create a PUT request to `http://localhost:5000/updateBlog/<ID>`
8. Send the request

