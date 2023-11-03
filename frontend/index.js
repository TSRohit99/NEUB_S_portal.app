async function handleClick(event) {
  event.preventDefault();
  const uidInput = document.getElementById("uid");
  const id = uidInput.value;
  // alert("ID:" + id);

  //fecting approach
  /* await fetch(`http://localhost:5000/students/${id}`)
    .then(res=>res.json())
    .then(data=> {
        alert( `UserName : ${data.name}\n
        Blood Group: ${data.bloodGroup}\n
        Email : ${data.email}\n
        CGPA: ${data.result}\n
        Regular Student : ${data.status}` 
            )} );
            */

  //using new page approach
  const redirectURL = `http://localhost:5000/students/${id}`;

  // Redirect to the constructed URL
  window.location.href = redirectURL;
}
