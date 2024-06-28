document.addEventListener('DOMContentLoaded', function() {
    var tokenText = document.getElementById("token");
    var copyButton = document.getElementById("copy-token");

    chrome.storage.local.get(['authToken'], function(result) {
        if (result.authToken) {
            tokenText.textContent = result.authToken;
        } else {
            tokenText.textContent = 'Não foi possível localizar seus tokens neste site.';
        }
    });

    copyButton.addEventListener('click', function() {
        copyToClipboard(tokenText.textContent);
    });

    function copyToClipboard(text) {
        var tempInput = document.createElement("input");
        tempInput.style.position = "absolute";
        tempInput.style.left = "-9999px";
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        
        var copyButton = document.getElementById("copy-token");
        copyButton.textContent = "Token copiado!";

        setTimeout(() => {
            copyButton.textContent = "Copiar Token";
        }, 1000)
    }
});
