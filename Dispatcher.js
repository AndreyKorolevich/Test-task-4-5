class Dispatcher {
    constructor (iframe) {
        this.iframe = iframe;
        window.addEventListener("message", this.listener.bind(this));
    }
    postMessage(message) { //method for sent messages to domain.two 
        this.iframe.postMessage(message, '*');
    }
    setData(data) {
            let message = JSON.stringify({'set' : data});
            this.postMessage(message);					
    }
    getData(key) {
            let message = JSON.stringify({'get' : key});					
            this.postMessage(message); 
    }
    deleteData(key) {
            let message = JSON.stringify({'delete' : key});					
            this.postMessage(message); 
    }
    listener(event) {	//method for receive  messages from domain.two		          	
            let div = document.createElement('div');
            div.innerText = JSON.parse(event.data);
            document.body.appendChild(div);	              
    }
}		