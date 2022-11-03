let input = prompt('what is your name?');
let title = document.querySelector('header h1');
title.innerHTML = input + "'s to do list";
let section = document.querySelector('section');
let add = document.querySelector('form button');
add.addEventListener('click',e => {
    e.preventDefault();
    // get the input values
    
    let form = e.target.parentElement;
    let toDoText = form.children[0].value;
    let date = form.children[1].value;

    if (toDoText === ''){
        alert('Please enter valid texts');
        return;
    }


    // create a todo
    let todo = document.createElement('div');
    todo.classList.add('todo');
    let text = document.createElement('p');
    text.classList.add('todo-text');
    text.innerText = toDoText;
    let time = document.createElement('p');
    time.classList.add('todo-time');
    time.innerText = date;
    todo.appendChild(text);
    todo.appendChild(time);

    // create green check and trash

    let completeBtton = document.createElement('button');
    completeBtton.classList.add('complete');
    completeBtton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completeBtton.addEventListener('click',e=>{
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle('done')
    })

    let trashButton = document.createElement('button');
    trashButton.classList.add('trash');
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trashButton.addEventListener('click',e=>{
        let todoItem = e.target.parentElement;
        todoItem.style.animation = 'scaleDown 1s forwards';
        todoItem.addEventListener('animationend',()=>{
            todoItem.remove();
        })
        let text = todoItem.children[0].innerText;
        let myListArray = JSON.parse(localStorage.getItem('list'));
        myListArray.forEach((item,index)=>{
            // if (item.todoText == text) {
            //     myListArray.splice(index,1);
            //     localStorage.setItem('list',JSON.stringify(myListArray))
            // }
        })
    })

    todo.appendChild(completeBtton);
    todo.appendChild(trashButton);
    todo.style.animation = 'scaleUp 1.0s forwards';

    // create an object
    let myTodo = {
        todoText:toDoText,
        date:date,
    }

    // store data into an array of objects
    let myList = localStorage.getItem('list');
    if (myList == null) {
        localStorage.setItem('list',JSON.stringify([myTodo]))
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem('list',JSON.stringify(myListArray))
    }

    form.children[0].value = '';
    form.children[1].value = '';
    section.appendChild(todo);
})

function loadData() {
    let myList = localStorage.getItem('list');
    if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item =>{

        // create a todo
        let todo = document.createElement('div');
        todo.classList.add('todo');
        let text = document.createElement('p');
        text.classList.add('todo-text');
        text.innerText = item.todoText;
        let date = document.createElement('p');
        date.classList.add('todo-time');
        date.innerText = item.date;
        todo.appendChild(text);
        todo.appendChild(date);
        let completeBtton = document.createElement('button');
        completeBtton.classList.add('complete');
        completeBtton.innerHTML = '<i class="fa-solid fa-check"></i>'
        completeBtton.addEventListener('click',e=>{
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle('done')
        })
        let trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        trashButton.addEventListener('click',e=>{
            let todoItem = e.target.parentElement;
            todoItem.style.animation = 'scaleDown 1s forwards';
            todoItem.addEventListener('animationend',()=>{
                todoItem.remove();
                // remove from localStorage
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem('list'));
                myListArray.forEach((item,index)=>{
                    if (item.todoText == text) {
                        myListArray.splice(index,1);
                        localStorage.setItem('list',JSON.stringify(myListArray))
                    }
                    localStorage.removeItem(todoText);
                })
            })
        })
        todo.appendChild(completeBtton);
        todo.appendChild(trashButton);

        section.appendChild(todo);
    })
}
}
loadData();
// let myList = localStorage.getItem('list');
// if (myList !== null) {
//     let myListArray = JSON.parse(myList);
//     myListArray.forEach(item =>{

//         // create a todo
//         let todo = document.createElement('div');
//         todo.classList.add('todo');
//         let text = document.createElement('p');
//         text.classList.add('todo-text');
//         text.innerText = item.todoText;
//         let date = document.createElement('p');
//         date.classList.add('todo-time');
//         date.innerText = item.date;
//         todo.appendChild(text);
//         todo.appendChild(date);
//         let completeBtton = document.createElement('button');
//         completeBtton.classList.add('complete');
//         completeBtton.innerHTML = '<i class="fa-solid fa-check"></i>'
//         completeBtton.addEventListener('click',e=>{
//             let todoItem = e.target.parentElement;
//             todoItem.classList.toggle('done')
//         })
//         let trashButton = document.createElement('button');
//         trashButton.classList.add('trash');
//         trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

//         trashButton.addEventListener('click',e=>{
//             let todoItem = e.target.parentElement;
//             todoItem.style.animation = 'scaleDown 1s forwards';
//             todoItem.addEventListener('animationend',()=>{
//                 todoItem.remove();
//                 // remove from localStorage
//                 let text = todoItem.children[0].innerText;
//                 let myListArray = JSON.parse(localStorage.getItem('list'));
//                 myListArray.forEach((item,index)=>{
//                     if (item.todoText == text) {
//                         myListArray.splice(index,1);
//                         localStorage.setItem('list',JSON.stringify(myListArray))
//                     }
//                     localStorage.removeItem(todoText);
//                 })
//             })
//         })
//         todo.appendChild(completeBtton);
//         todo.appendChild(trashButton);

//         section.appendChild(todo);
//     })
// }

function merge(arr1,arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    let date1 = new Date(arr1[i].date).getTime();  
    let date2 = new Date(arr2[j].date).getTime();
    while (i< arr1.length && j<arr2.length) {
        if (Number(date1) > Number(date2)){
          result.push(arr2[j]);
          j++; 
        } else{
            result.push(arr1[i]);
            i++;
        }
    }
    while (i<arr1.length) {
        result.push(arr1[i]);
        i++;
    }
    while (j<arr2.length) {
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr) {
    if (arr.length === 1) {
        return arr;
    } else {
        let middle = Math.floor(arr.length/2);
        let left = arr.slice(0,middle);
        let right = arr.slice(middle,arr.length);
        return merge(mergeSort(left),mergeSort(right));
    }
}
let sort = document.querySelector('div.sort');
sort.addEventListener('click',()=>{
    // sort data
    let sortedArray = JSON.parse(localStorage.getItem('list')).sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
    localStorage.setItem('list',JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for (let i=0; i<len;i++) {
        section.children[0].remove();
    }
    
    // load data
    loadData();
})
