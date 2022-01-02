const express = require('express');
const posts = require('../models/Post');
// DB 연결부분
// MongoDB 할거면 여기에서 연결하는 거임..

const router = express.Router();

router.get('/', (req, res, next) => {
    const section = req.query.section;
    // localhost:8080/api/posts?section=뭐시기 형식으로 들어옴
    console.log(section);
    // console.log(typeof posts)
    // console.log(posts)
    const data = section ? posts.posts.filter(b => b.section === section) : posts;
    // section=뭐시기가 있으면 section=뭐시기, 없으면 posts
    res.json({ result: "success", data: data });
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    // console.log(typeof posts)
    // console.log(posts)
    const post = posts.posts.find(b => b.id == id);
    //타입이 number와 string이라서 ===이면 안됨.
    //MongoDB면 이 부분은 Mongoose에 맞게 수정해야 됨.
    res.json({ post });
    // ES6 이후로, key,value가 같으면 key로 축약 가능
})

// posts로 localhost:8080/api/posts
// {
//     "title" : "hello world title",
//     "content" : "hello world content",
//     "section" : "hello world section"
// }
router.post('/', (req, res, next) => {
    console.log(req.body);
    const id = posts.posts.length + 1;
    const title = req.body.title;
    const content = req.body.content;
    const section = req.body.section;
    const pubDate = new Date().toString();
    const modDate = new Date().toString();
    let post = {id, title, content, section, pubDate, modDate};
    posts.posts.push(post);
    res.status(201).json(post);
})

module.exports = router;