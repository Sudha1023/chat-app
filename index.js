const firebaseConfig = {
    apiKey: "AIzaSyDilw7aGsE0Ob5z1eb3fgzTqNWLobKczlc",
    authDomain: "chat-app-4fd01.firebaseapp.com",
    databaseURL: "https://chat-app-4fd01-default-rtdb.firebaseio.com",
    projectId: "chat-app-4fd01",
    storageBucket: "chat-app-4fd01.appspot.com",
    messagingSenderId: "269946991679",
    appId: "1:269946991679:web:eb9ddc3eb0db04c6e9f48a"
};
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  function scrollToBottom(){
    var objDiv = document.getElementById("bodyContent");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  function typeMessage(){
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    const submit_btn = document.getElementById("submit");
    if(message.length > 0){
       submit_btn.removeAttribute('disabled',true)
    }else{
       submit_btn.setAttribute('disabled',true)
    }
  }
  
  function sendMessage() {
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
    typeMessage();
  
    //auto scroll to bottom
    document
      .getElementById("bodyContent")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("sudha-deepak/" + timestamp).set({
      username,
      message,
    });
  }
  
  const fetchChat = db.ref("sudha-deepak/");

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("bodyContent").innerHTML += message;
    scrollToBottom();
  });


  var loginBtn = document.getElementById('loginBtn');
  loginBtn.addEventListener('click', function(){
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      var id = 'id' + (new Date()).getTime();
      localStorage.setItem("id", id);
      localStorage.setItem("username", username);
      const timestamp = Date.now();

      // save in db
      db.ref("users/"+timestamp).set({
        id,
        username,
        password,
      });
  })


  const getUsers = db.ref('users');
  console.log(getUsers);        