src = "/socket.io/socket.io.js"


// const editor = document.querySelector("#editor");

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})
const html = document.querySelector("#html")
const css = document.querySelector("#css")
const js = document.querySelector("#js")
// const pre = document.querySelector("#preview-window")


document.getElementById("html").addEventListener("keyup",run);
  document.getElementById("css").addEventListener("keyup",run);
  document.getElementById("js").addEventListener("keyup",run);
// document.getElementById("preview-window").addEventListener("keyup",run);

function run()
{
  const socket = io();
  var htmlCode = document.getElementById("html").value;
  console.log(htmlCode);
  socket.emit("htmlCode", htmlCode)
  var cssCode = "<style>" + document.getElementById("css").value + "</style>";
  socket.emit("cssCode", cssCode)
  var jsCode= document.getElementById("js").value;
  socket.emit("jsCode", jsCode)
  var preview = document.getElementById("preview-window");
  preview.contentDocument.body.innerHTML = htmlCode + cssCode ;
  preview.contentWindow.eval(jsCode);
}


socket.on("htmlCode", (val1) =>
{
  html.value = val1;
});

socket.on("cssCode", (val2) =>
{
  css.value = val2;
});

socket.on("jsCode", (val3) =>
{
  js.value = val3;
});


socket.emit('join', {username, room}, (error) => {
  if(error){
    alert(error)
    location.href = '/'
  }
})
