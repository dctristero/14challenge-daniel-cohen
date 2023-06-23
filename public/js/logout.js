// function to log out user
const logout = async () => {
   const response = await fetch("/api/users/logout", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
   });
   // if good send to main landing page to log in again or alerts a status error
   if (response.ok) {
     document.location.replace("/");
   } else {
     alert("you are my prisoner");
   }
 };
 
 // review view port to find appropriate locations to listen in order to execute function
 document
 .querySelector('#logout')
 .addEventListener('click', logout);