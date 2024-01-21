const util = { 
    getCookie(name){
        const cookies = document.cookie.split(';');
        console.log("cookies:", cookies)
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
        
            if (cookieName === name) {
                return cookieValue;
            }
        }
    
        return null; // 如果未找到对应的cookie，返回null或其他适当的值
    }
}

export default util