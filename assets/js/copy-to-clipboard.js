document.addEventListener('DOMContentLoaded', function () {
    var codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(function (code) {
        var button = document.createElement('button');
        button.className = 'copy-button';
        button.type = 'button';
        button.innerText = 'Copy';
        button.addEventListener('click', function () {
            navigator.clipboard.writeText(code.innerText);
        });
        code.parentNode.appendChild(button);
    });
});
