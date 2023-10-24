// Grab message from static website

function getMessage() {
    console.log("Message Received");
    var msg = document.getElementById("input").value;
    var sender = document.getElementById("name").value;
    var url = 'http://localhost:5000/message/' + sender + '/' + msg;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == XMLHttpRequest.DONE) {
          if (xhttp.status == 200) {
            //alert(httpRequest.responseText);
            r.innerText = xhttp.responseText;
          } else { alert('ERROR'); }
        }
      }
  
      p = fetch(url);
  
      p.then(
        (response) => {
            console.log(typeof response);
            return response.text();
        }
      )
        .then((text) => {
          console.log(text);
          document.getElementById("textbox").innerHTML = text;
        })
        .catch((error) => {
          console.log('THERE WAS A PROBLEM');
          console.log(error);
        });
        // Reset input field
        document.getElementById("input").value = "";
        document.getElementById("name").value = "";

}

// Event listener on message sent

document.getElementById("myForm").addEventListener("submit", (e)=> {
    e.preventDefault();
    getMessage();
})