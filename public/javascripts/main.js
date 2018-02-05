let codeEditor = document.getElementById('code');
let editor = CodeMirror.fromTextArea(codeEditor,{
    theme:"duotone-dark",
    lineNumbers: true,
    mode:'text/x-c++src',
});
const LANG_MODES = {
    "cpp":"text/x-c++src",
    "c":"text/x-csrc",
    "cs":"text/x-csharp",
    "java":"text/x-java",
    "js":"text/javascript",
    "coffee":"text/coffeescript",
    "cr":"text/x-crystal",
    "css":"text/css",
    "go":"text/x-go",
    "lua":"text/x-lua",
    "md":"text/x-markdown",
    "conf":"text/x-nginx-conf",
    "php":"text/x-php",
    "py":"text/x-python",
    "swift":"text/x-swift",
    "yml":"text/x-yaml"
};

let modeSelector = document.getElementById('mode-select');
function changeMode(){
    let mode = modeSelector.options[modeSelector.selectedIndex].value.split("//")[1];
    editor.setOption("mode",mode);
}