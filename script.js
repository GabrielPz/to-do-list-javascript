const localStorageKey = 'to-do-list-gn'

const validateIfExistsNewTask = () => {
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

const newTask = () =>{
    let input = document.getElementById('input-new-task')
    input.style.border = ''
    if(!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
        return;
    }
    if(validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição')
        return;
    }
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
        name: input.value,
        userId: 2
    })
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
    input.value = ''
}


const showValues = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    let values = JSON.parse(localStorage.getItem('to-do-list-gn') || "[]");
    const sortedValues = values.filter(item => item.userId == user.id);
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''
    for(let i = 0; i < sortedValues.length; i++)
    {
        list.innerHTML += `<li>${sortedValues[i]['name']}<button id='btn-ok' onclick='removeItem("${sortedValues[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`
    }
}

const removeItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(task => task.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}



const createUser = () => {
    let users = JSON.parse(localStorage.getItem('users') || "[]");
    if(users.length >= 1){
        return;
    }
    let lastId = localStorage.getItem('lastId') || 0;
    lastId++;
    const user = {
        id: lastId,
        username: 'Gabriel',
        password: '123456'
    };

    console.log(user);
    users.push(user);
    localStorage.setItem('lastId', lastId);
    localStorage.setItem('users', JSON.stringify(users));
    
    login();
}

const login = () => {

    const usernameInput = document.getElementById('usernameInput').value
    const passwordInput = document.getElementById('passwordInput').value
    let users = JSON.parse(localStorage.getItem('users') || "[]");
    const validUser = users.find( user => user.password == passwordInput && user.username == usernameInput);
    console.log(validUser);
    if(validUser){
        localStorage.setItem('user', JSON.stringify(validUser));
        window.location.href ='./index.html'
    };
}   

createUser();