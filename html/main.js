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