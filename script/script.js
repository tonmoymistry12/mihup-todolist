var divs = ["Menu1", "Menu2"];
var visibleDivId = null;
function toggleVisibility(divId) {
  if(visibleDivId === divId) {
    //visibleDivId = null;
  } else {
    visibleDivId = divId;
  }
  hideNonVisibleDivs();
}
function hideNonVisibleDivs() {
  var i, divId, div;
  for(i = 0; i < divs.length; i++) {
    divId = divs[i];
    div = document.getElementById(divId);
    if(visibleDivId === divId) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }
}

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}
 
function add() {
    var task = {task:document.getElementById('task').value, checked:false}
 
    var todos = get_todos();
    if(document.getElementById('task').value){
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));
     
        show();
    }
    else{
        alert("Please add some todo")
    }
    
 
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}

function handleClick(event) {
    console.log(event);
    var id = event.target.id.slice(5);
    var data =JSON.parse(localStorage.getItem('todo'))
    var checkBox = document.getElementsByClassName('check');
    if(checkBox[id].checked){
        data[id].checked=true;
    }
    else{
        data[id].checked=false;
    }
    localStorage.setItem('todo', JSON.stringify(data));
}

function inputChange(event){
    var id = event.target.id.slice(5);
    var data =JSON.parse(localStorage.getItem('todo'));
    data[id].task=event.target.value;
    localStorage.setItem('todo', JSON.stringify(data));
}
 
function show() {
    var todos = get_todos();

    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li class="items-li" ><div class="items"><input type="checkbox"  id="'+"check"+i+'" value="'+todos[i].checked+'" class="check" ><input type="text" class="item-text" id="'+"todol"+i+'" value="'+ todos[i].task + '"></div><button id="'+ i +'" class="remove"><span class="glyphicon glyphicon-remove"></span></button></li><br>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };

    var checkBox = document.getElementsByClassName('check');
    var inputfield = document.getElementsByClassName('item-text');
    var data =JSON.parse(localStorage.getItem('todo'))
    for (var i=0; i < checkBox.length; i++) {
        checkBox[i].addEventListener('click', handleClick);
        inputfield[i].addEventListener('input', inputChange);
        if(data[i].checked){
            checkBox[i].checked=true;
        }
    };
    for (var i=0; i < checkBox.length; i++) {
       
        inputfield[i].addEventListener('change', inputChange);
        
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();