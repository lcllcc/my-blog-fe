import showMessage from "./message.js";

class Channel {
    constructor(config) {
        let { model, wsApiPath } = config;
        this.wsApiPath = wsApiPath
        this.model = model
    
        // 模型状态信息
        this.isThinking = false
        this.query = ""
        this.answer = ""
        this.chatLogList = []
        this.currentChatIdx = -1
        this.socket = {}

        // 初始化
        this.initWs()
    }

    initWs(){
        console.log("int ws...");
        const socket = new WebSocket(this.wsApiPath);
        this.socket = socket
    
        socket.onopen = (event) => {
            console.log("onopen", event);
        }
    
        socket.onerror = (event) => {
            console.log("onerror", event)
        }
    
        socket.onclose = (event) => {
            console.log("onclose", event);
        }
    
        socket.onmessage = (event) => {
            if(event.data == "ON_COMPLETE" || event.data == "ON_ERROR"){
                console.log("received msg：", this.answer)
                this.thinkingOver()
            }else{
                this.answer = this.answer + event.data
                this.chatLogList[this.currentChatIdx].content = this.answer
                showMessage(this.answer, 90000, 99)
            }
        }
    
        console.log("init ws done.");
        return this.socket;
    }
    
    async sendMessage(query) {
        // loading
        document.getElementById(`waifu-input-button`).classList.add("loading");
        document.getElementById(`waifu-input-button`).innerText = "";
        document.getElementById(`waifu-input`).disabled = true;

        // websocket对话
        console.log("send msg:", query)
        this.isThinking = true
        this.query = query
        this.chatLogList.push(
            {
                "role": "user",
                "content": this.query
            }
        )
        if(this.socket && this.socket.readyState == this.socket.OPEN){
            this.chatLogList.push(
                {
                    "role": "system",
                    "content": this.answer
                }
            )
            this.currentChatIdx = this.currentChatIdx + 2
            this.socket.send(JSON.stringify(this.chatLogList.slice(-5, -1)));
        }else{
            this.chatLogList.push(
                {
                    "role": "system",
                    "content": '!!! error\n服务器异常，请刷新页面后重试\n!!!'
                }
            )
            this.thinkingOver()
        }
    }
    
    async thinkingOver(){
        this.isThinking = false;
        this.answer = "";
        document.getElementById(`waifu-input-button`).classList.remove("loading");
        document.getElementById(`waifu-input-button`).innerText = "发送"
        document.getElementById("waifu-input").value = ""
        document.getElementById(`waifu-input`).disabled = false;
    }
}

export default Channel;