const postId = document.querySelector('input[name="post-id"]').value;

const moreDifferentPost = async function(event) {
  event.preventDefault();

  const moreDifferentTitle = document.querySelector(`#post-title`).value;
  const moreDifferentBody = document.querySelector(`#post-body`).value;

  await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      moreDifferentTitle,
      moreDifferentBody
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard/user-home');
};

const throwItIntoTheSun = async function() {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', moreDifferentPost);
document
  .querySelector('#delete-btn')
  .addEventListener('click', throwItIntoTheSun);
