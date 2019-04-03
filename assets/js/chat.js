
function search() {
    let  input, filter, ul, li, a, i, txtValue
    input = document.getElementById("myInput")
    filter = input.value.toUpperCase()
    ul = document.getElementById("myUL")
    li = ul.getElementsByTagName("li")
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = ""
        } else {
            li[i].style.display = "none"
        }
    }
}
function promptUser() {
    fetch('http://localhost/devChat/user.php',{
            method: 'POST',
            headers: new Headers()
        }).then((res)=>res.text()).then((ress)=>{
            user = JSON.parse(ress)
            console.log(user)
            let ul = document.getElementById("myUL")
            for (let i = 0; i < user.length; i++){
                let li = document.createElement("LI")
                let a = document.createElement(("A"))
                let node = document.createTextNode(user[i]['pseudo'])
                a.appendChild(node)
                li.appendChild(a)
                ul.appendChild(li)

            }
    })
}
//validé
const login = function () {
    let pseudo = prompt("Veuillez saisir un pseudo")
    console.log(pseudo)
    let formlogin = new FormData
    formlogin.append('pseudo', pseudo)
    console.log(color())
    formlogin.append('color',color())
    fetch('http://localhost/devChat/login.php', {
        method: 'POST',
        headers: new Headers(),
        body: formlogin
    }).then((res)=>res.text()).then((ress)=>{
        result = JSON.parse(ress)
        console.log(result)
        if (result === false) {
            alert("le pseudo existe déjà")
            login()
        }else {
            sessionStorage.setItem('pseudo', result['pseudo'])
            sessionStorage.setItem('id', result['id'])
            promptUser()
        }
    })
}
const sendMessage = function() {
    let content = document.getElementById("chat").value
    let formContent = new FormData
    formContent.append('contenu', content)
    formContent.append('id_user',sessionStorage.getItem('id'))
    fetch('http://localhost/devChat/sendMessage.php', {
        method: 'POST',
        headers: new Headers(),
        body: formContent
    }).then((res)=>res.text())
}
const getMessage = function () {
    fetch('http://localhost/devChat/refresh.php', {
        method: 'GET',
        headers: new Headers(),
    })
        .then(res => res.json())
        .then((ress) => {
            displayMessage(ress)
        })
}

const refresh = function () {
    let chat = document.getElementById("div-chat")
    getMessage()
    chat.remove()
}

const displayMessage = function(e){
    let first = document.getElementById('cover')
    let chat = document.createElement("div")
    chat.setAttribute("id","div-chat")
    for(let i = 0 ; i < e.length ; i++) {
        p = document.createElement('p')
        pseudo = document.createElement('span')
        pseudo.style.backgroundColor = e[i]['color']
        content = document.createElement('span')
        content.style.backgroundColor = e[i]['color']
        date = document.createElement('span')
        date.style.backgroundColor = e[i]['color']
        if(sessionStorage.getItem('id') === e[i]['id_user']){
            p.setAttribute('id','coverRight')
        }
        pseudo.innerText = e[i]['pseudo']
        content.innerText = e[i]['contenu']
        date.innerText = e[i]['date']
        p.appendChild(pseudo)
        p.appendChild(content)
        chat.appendChild(p)
        first.appendChild(chat)
    }
}

const color = function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

buttonSend = document.getElementById('send')
buttonSend.addEventListener("click", function () {
    sendMessage()
})


window.onload = function(){
    login()
    getMessage()
    setInterval(refresh,5000)
}