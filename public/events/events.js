// to toggle the comment box
let editCommentBtns = document.querySelectorAll("#editComment");
let updateCommentBox = document.querySelectorAll("form.updateCommentBox");
let commentCancel = document.querySelectorAll("#commentCancel");

for (let i=0; i<= editCommentBtns.length-1; i++) {
     for (let j=0; j <= updateCommentBox.length-1; j++) {
        editCommentBtns[i].addEventListener("click", () => {
            // classList.toggle is not working properly..
            updateCommentBox[i].classList.remove("hidden");
        });
    };
};

for (let i=0; i<= commentCancel. length-1; i++) {
    commentCancel[i].addEventListener("click", () => {
        // for some reason when you cancel page is refreshing it
        // its beacuase of the font awesome as per running debugger
        updateCommentBox[i].classList.add("hidden");
    })
}
