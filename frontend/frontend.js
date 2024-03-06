const queryString = window.location.search;
const hostname = window.location.hostname;

let backendUrl = 'ws://localhost:6060/';
if (/-frontend/.test(hostname)) {
    backendUrl = `wss://${hostname.replace(/-frontend/, '-backend')}/`;
}

const socket = new WebSocket(`${backendUrl}${queryString}`);
socket.onmessage = (event) => {
    term.write(event.data);
}

var term = new window.Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        runCommand('\n');
    };
    setTimeout(() => {
        term.prompt();
    }, 300);

    term.onKey(keyObj => {
        runCommand(keyObj.key);
    });
}

function runCommand(command) {
    socket.send(command);
}

init();
