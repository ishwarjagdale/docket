let counter = 0;

function push(node, timeout) {
    let stack = document.getElementById("noti-stack");
    stack.appendChild(node);
    if(timeout !== undefined)
        setTimeout(() => {
            stack.removeChild(node);
        }, timeout);
}

function notify(str, tempo) {
    console.log(str, tempo);
    let notification = document.createElement("span");
    notification.id = counter.toString();
    counter++;
    notification.innerText = str;
    notification.classList.add("notification", "ani-nots", tempo);
    push(notification, 5000);
}

export {notify};