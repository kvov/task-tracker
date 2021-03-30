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

// ul.addEventListener("click", removeEntry);

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

// The current dragging item
let draggingEle;

// The current position of mouse relative to the dragging element
let x = 0;
let y = 0;

const mouseDownHandler = function(e) {
    draggingEle = e.target;

    // Calculate the mouse position
    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    // Set position for dragging element
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${e.pageY - y}px`; 
    draggingEle.style.left = `${e.pageX - x}px`;
};

const mouseUpHandler = function() {
    // Remove the position styles
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    x = null;
    y = null;
    draggingEle = null;

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

// Query the list element
// const list = document.getElementById('list');

// Query all items
[].slice.call(ul.querySelectorAll('.first-li')).forEach(function(item) {
    item.addEventListener('mousedown', mouseDownHandler);
});
// document.addEventListener('DOMContentLoaded', function() {
//     // Query the list element
//     // const list = document.getElementById('list');

//     let draggingEle;
//     let placeholder;
//     let isDraggingStarted = false;

//     // The current position of mouse relative to the dragging element
//     let x = 0;
//     let y = 0;

//     // Swap two nodes
//     const swap = function(nodeA, nodeB) {
//         const parentA = nodeA.parentNode;
//         const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

//         // Move `nodeA` to before the `nodeB`
//         nodeB.parentNode.insertBefore(nodeA, nodeB);

//         // Move `nodeB` to before the sibling of `nodeA`
//         parentA.insertBefore(nodeB, siblingA);
//     };

//     // Check if `nodeA` is above `nodeB`
//     const isAbove = function(nodeA, nodeB) {
//         // Get the bounding rectangle of nodes
//         const rectA = nodeA.getBoundingClientRect();
//         const rectB = nodeB.getBoundingClientRect();

//         return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
//     };

//     const mouseDownHandler = function(e) {
//         draggingEle = e.target;

//         // Calculate the mouse position
//         const rect = draggingEle.getBoundingClientRect();
//         x = e.pageX - rect.left;
//         y = e.pageY - rect.top;

//         // Attach the listeners to `document`
//         document.addEventListener('mousemove', mouseMoveHandler);
//         document.addEventListener('mouseup', mouseUpHandler);
//     };

//     const mouseMoveHandler = function(e) {
//         const draggingRect = draggingEle.getBoundingClientRect();

//         if (!isDraggingStarted) {
//             isDraggingStarted = true;
            
//             // Let the placeholder take the height of dragging element
//             // So the next element won't move up
//             placeholder = document.createElement('li');
//             placeholder.classList.add('placeholder');
//             draggingEle.parentNode.insertBefore(placeholder, draggingEle.nextSibling);
//             placeholder.style.height = `${draggingRect.height}px`;
//         }

//         // Set position for dragging element
//         draggingEle.style.position = 'absolute';
//         draggingEle.style.top = `${e.pageY - y}px`; 
//         draggingEle.style.left = `${e.pageX - x}px`;

//         // The current order
//         // prevEle
//         // draggingEle
//         // placeholder
//         // nextEle
//         const prevEle = draggingEle.previousElementSibling;
//         const nextEle = placeholder.nextElementSibling;
        
//         // The dragging element is above the previous element
//         // User moves the dragging element to the top
//         if (prevEle && isAbove(draggingEle, prevEle)) {
//             // The current order    -> The new order
//             // prevEle              -> placeholder
//             // draggingEle          -> draggingEle
//             // placeholder          -> prevEle
//             swap(placeholder, draggingEle);
//             swap(placeholder, prevEle);
//             return;
//         }

//         // The dragging element is below the next element
//         // User moves the dragging element to the bottom
//         if (nextEle && isAbove(nextEle, draggingEle)) {
//             // The current order    -> The new order
//             // draggingEle          -> nextEle
//             // placeholder          -> placeholder
//             // nextEle              -> draggingEle
//             swap(nextEle, placeholder);
//             swap(nextEle, draggingEle);
//         }
//     };

//     const mouseUpHandler = function() {
//         // Remove the placeholder
//         placeholder && placeholder.parentNode.removeChild(placeholder);

//         draggingEle.style.removeProperty('top');
//         draggingEle.style.removeProperty('left');
//         draggingEle.style.removeProperty('position');

//         x = null;
//         y = null;
//         draggingEle = null;
//         isDraggingStarted = false;

//         // Remove the handlers of `mousemove` and `mouseup`
//         document.removeEventListener('mousemove', mouseMoveHandler);
//         document.removeEventListener('mouseup', mouseUpHandler);
//     };

//     // Query all items
//     [].slice.call(ul.querySelectorAll('.first-li')).forEach(function(item) {
//         item.addEventListener('mousedown', mouseDownHandler);
//     });
// });