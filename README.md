# board-node-project

## 목적
### 1.1 의도
Node.js를 활용하여 간단한 CR 서비스를 만드는 공부를 하기 위해 만들었습니다.

### 1.2 주 목적
간단하게 메모를 작성하고 이를 디렉토리 내 파일에 저장하는 서비스입니다.

## 요약
### 2.1 내용 및 주요 기능
 1. localhost:8080에서 노드 서버를 실행
 2. localhost(Node)와 LiveServer(HTML)의 디렉토리를 분리하여, CORS 에러 문제 예방
 3. HTML Form에서 내용을 입력하고 버튼을 누르면, 우측 영역에 메모글 렌더링
    * Form에 빈 값이 있을 경우, 값을 입력하라는 내용의 alert창을 보여줌
 4. router.get과 router.post를 이용한 CR 구현

## 제작 내용
### 3.1 제작 기간 및 역할
#### 3.1.1 제작 기간
1. 개발 : 1일 소요
2. 디자인 : 1시간 소요

## 3.2 주요 코드

### 3.2.1 node/index.js

```jsx
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
```

### 3.2.2 node/routes/posts.js

```jsx
const express = require('express');
const posts = require('../models/Post');
// DB 연결부분

const router = express.Router();

router.get('/', (req, res, next) => {
    const section = req.query.section;
    const data = section ? posts.posts.filter(b => b.section === section) : posts;
    res.json({ result: "success", data: data });
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    // console.log(typeof posts)
    // console.log(posts)
    const post = posts.posts.find(b => b.id == id);
    //타입이 number와 string이라서 ===이면 안됨.
    //MongoDB면 이 부분은 Mongoose에 맞게 수정해야 됨
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

```

### 3.2.3 html/main.js

```jsx
const noteList = document.querySelector(".note-list");
const BASE_URI = "http://localhost:8080/api/posts";

fetch(BASE_URI)
    .then(function (response) {
        console.log(1);
        return response.json();
    })
    .then(function (json) {
        console.log(2);
        console.log(json);
        addNote(json.data);
        return json
    })
    .catch(err => alert(err))

function addNote(note) {
    console.log("addnote", note);
    note.posts.forEach(notedata => {
        const newNote = document.createElement("div");
        newNote.classList.add("note");
        newNote.innerHTML = `
            <p>${notedata.id}</p>
            <div class="item-title">
                <div class="title-text">${notedata.title}</div>
                <div class="option-text">
                    <span class="item-edit-btn">수정</span> |
                    <span class="item-del-btn">삭제</span>
                </div>
            </div>
            <p>${notedata.content}</p>
            <p>${notedata.section}</p>
            <p></p>
        `;
        noteList.appendChild(newNote);
    });
}

function submit() {
    const valTitle = document.getElementById("title").value;
    const valContent = document.getElementById("content").value;
    const valSection = document.getElementById("section").value;

    if (valTitle == "" || valContent == "" || valSection == "") {
        alert("값을 입력해주세요")
        return
    }

    let valNote = {
        "title": valTitle,
        "content": valContent,
        "section": valSection,
    }

    fetch(BASE_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(valNote)
    }).then((resp) => addNote(resp));
    window.location.reload();
}
```

## 4. 언어 및 라이브러리

- HTML/CSS
- JavaScript
- Node.js

## 5. 디렉토리 트리

![image](https://user-images.githubusercontent.com/87234410/147879125-25455ec2-6448-4286-9906-abf41bbd85ba.png)
