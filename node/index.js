// npm init --yes
// npm i express dotenv cors
// npm install --save-dev nodemon 
// package.json에서 
// "test": "echo \"Error: no test specified\" && exit 1"를
// "start" : "nodemon index.js"로 고치고
// npm start

const express = require("express");
const app = express();
const dotenv = require("dotenv"); // 이번 프로젝트에서는 쓰지 않음
const cors = require('cors');

const postRoute = require("./routes/posts"); // 라우팅할 페이지 지정

dotenv.config();
app.use(express.json());
app.use(cors());

app.get('/', function(req, res, next) {
    res.send('index');
});

app.use("/api/posts", postRoute); // 페이지 라우팅

app.use((req, res, next) => {
    res.sendStatus(404);
});

    
app.use((err, req, res, next) => {
    console.log('에러 발생!')
    console.log(err);
    res.sendStatus(500);
});

app.listen("8080", () => {
    console.log("노드 실행 중!");
});