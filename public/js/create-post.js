const createPost = async function(event) {
   event.preventDefault();
 
   const title = document.querySelector("#create-post-title").value;
   const body = document.querySelector("#create-post-body").value;
 
   await fetch(`/api/posts`, {
     method: 'POST',
     body: JSON.stringify({
       title,
       body,
     }),
     headers: { 'Content-Type': 'application/json' },
   });
 
   document.location.replace('/dashboard/user-home');
 };
 
 document
   .querySelector('#new-post-form')
   .addEventListener('submit', createPost);