

function handleClick(event) {
    event.preventDefault();
    const uidInput = document.getElementById("uid");
    const id = uidInput.value;
    // alert("ID:" + id);

    fetch(`http://localhost:5000/students/${id}`)
    .then(res=>res.json())
    .then(data=> {
        alert( `UserName : ${data.name}\n
        Blood Group: ${data.bloodGroup}\n
        Email : ${data.email}\n
        CGPA: ${data.result}\n
        Regular Student : ${data.status}` 
            )})
}

