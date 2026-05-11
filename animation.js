document.addEventListener("DOMContentLoaded", () => {
    // 1. ROOT NODE BYPASS
    const currentPath = window.location.pathname;
    if (currentPath.endsWith("index.html") || currentPath === "/" || currentPath.endsWith("/")) {
        return; 
    }

    // 2. MULTI-LINGUAL DECRYPTION PAYLOAD
    // Includes standard Latin, Symbols, Katakana, Hangul, and Hanzi
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
        
        // --- TIMING CONTROLS ---
        let speed = 20; // Increased from 15ms to stretch the frame duration slightly

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
            
            // --- REVEAL RATE ---
            iteration += 1; // Dropped from 2 to 1. Reveals one character per tick.
        }, speed);
    });
});