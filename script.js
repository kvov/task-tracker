let sortBtn = document.querySelector('.sort-btn');
let sortAscend = document.getElementById('sort-ascend');
let sortDescend = document.getElementById('sort-descend');
let ul = document.querySelector('.list');
let addBtn = document.querySelector('.add-btn');
let sortDirection = 1;

sortBtn.addEventListener("click", (event) => {
    sortAscend.classList.toggle("hidden");
    sortDescend.classList.toggle("hidden");              
});

addBtn.addEventListener("click", newEntry);

ul.addEventListener("click", removeEntry);

function newEntry() { 
    let newLi = `<li class="first-li" draggable="true">
        <input class="task-name" type="text" name="taskname">
        <button class="remove-btn" type="button">
            <svg class="remove" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4"/>
                <path d="M6 6L14 14" stroke="#C4C4C4"/>
                <path d="M6 14L14 6" stroke="#C4C4C4"/>
            </svg>        
        </button>
        </li>`
    ul.insertAdjacentHTML('beforeEnd', newLi);    
}

function removeEntry(el) {
    if(el.target.classList.contains('remove')) {      
        el.target.parentElement.parentElement.remove();   
    }
}  

sortBtn.addEventListener("click", (event) => {
    let entries = Array.prototype.slice.call(document.getElementsByClassName('task-name'));
    entries.sort(function(a, b) {
        return a.value.localeCompare(b.value) * sortDirection;
    });
    sortDirection = sortDirection * -1;
    entries.forEach((entry, i) => {
        let parent = entry.parentElement;
        parent.remove();
        ul.append(parent);
    });
});

