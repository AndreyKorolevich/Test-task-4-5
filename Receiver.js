class Receiver {
    constructor() {
        window.addEventListener("message", this.listener.bind(this)); 
    }                
    listener(event) {     //method for receive  messages from domain.one     
        if (event.data) {
            let message = JSON.parse(event.data), // message
                action = Object.keys(message)[0], // action 'add', 'read' или 'delete'
                messageBody = message[action], // body`s message
                key, 
                value,
                check, // check if there`s record in localStorage
                callback 
                
            switch (action) {
                case 'set':
                    key = Object.keys(messageBody)[0];
                    value = messageBody[key];
                    localStorage[key] = JSON.stringify(value);                       
                    callback = `Set in localStorage data with key: ${key} and value: ${value}`; 
                    console.log(callback);
                    event.source.postMessage(JSON.stringify(callback), '*');                                  
                    break;

                case 'get':
                    check = localStorage[messageBody];                                                       
                    check ? value = JSON.parse(check) : value = undefined;                         
                    value ?
                        callback = `Get from localStorage data with key: ${messageBody} and value: ${value}` :                          
                        callback = `"${messageBody}" isn\`t found`;
                    console.log(callback);                         
                    event.source.postMessage(JSON.stringify(callback),  '*');
                    break;

                case 'delete':  
                    check = localStorage[messageBody];
                    if (check) {
                        localStorage.removeItem(messageBody);
                        callback = `Removed from localStorage data with key: "${messageBody}"`;
                    } else {
                        callback = `"${messageBody}" isn\`t found`;
                    }
                    console.log(callback);
                    event.source.postMessage(JSON.stringify(callback),  '*');
            }
        }    
    }
}