const makeComment = async function(event) {
   event.preventDefault();
 
   const postID = document.querySelector("#post-id").value;
   const commentText = document.querySelector("#comment-body").value;
 
   await fetch(`/api/comments`, {
     method: 'POST',
     body: JSON.stringify({
       postID,
       body: commentText,
     }),
     headers: { 'Content-Type': 'application/json' },
   });
 
   document.location.reload();
 };
 
 document
   .querySelector('#new-comment-form')
   .addEventListener('submit', makeComment);