document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    if (currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("/")) {
        return; 
    }

    const cypherAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッンㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ的了一是不在我有他这为之大来以个中上们";
    
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim() !== "") {
            textNodes.push(node);
        }
    }

    textNodes.forEach(textNode => {
        const originalText = textNode.nodeValue;
        let iteration = 0;
        
        let speed = 20;

        const decryptInterval = setInterval(() => {
            textNode.nodeValue = originalText.split("").map((char, index) => {
                if (char === " " || char === "\n") return char;
                if (index < iteration) return originalText[index];
                return cypherAlphabet[Math.floor(Math.random() * cypherAlphabet.length)];
            }).join("");

            if (iteration >= originalText.length) {
                clearInterval(decryptInterval);
                textNode.nodeValue = originalText; 
            }
            
            iteration += 1;
        }, speed);
    });
});