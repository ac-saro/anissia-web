<template>
    <router-view/>
</template>

<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url(~@fortawesome/fontawesome-free/css/all.min.css);
@import url(~vue-snotify/styles/material.css);

img, a { border: 0; }
table { border-collapse: collapse; }
input, textarea { outline: none; }
html { height: 100%; }
body { height: 100%; margin: 0; padding: 0; }
input::-ms-clear, input::-ms-reveal { display: none; }
blockquote { padding: 0 1em; margin:0; color: #6a737d; border-left: .25em solid #dfe2e5; }
::-webkit-scrollbar{width:8px;height:8px}
::-webkit-scrollbar-track{background-color:#fafafa}
::-webkit-scrollbar-thumb{background-color:rgba(197, 197, 197, 0.3)}
::-webkit-scrollbar-thumb:hover{background-color:rgb(202, 202, 202)}

/** amend of the color picker */
.clock-picker .clock-picker__dialog-content { text-align: center }

/** basic theme - radio */
[type="radio"]:checked,
[type="radio"]:not(:checked) { position: absolute; left: -9999px; }
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label { position: relative; padding-left: 28px; cursor: pointer; line-height: 20px; display: inline-block; color: #666; }
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before { content: ''; position: absolute; left: 0; top: 0; width: 18px; height: 18px; border: 1px solid #ddd; border-radius: 100%; background: #fff; }
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after { content: ''; width: 12px; height: 12px; background: #4d9cff; position: absolute; top: 4px; left: 4px; border-radius: 100%; -webkit-transition: all 0.2s ease; transition: all 0.2s ease; }
[type="radio"]:not(:checked) + label:after { opacity: 0; -webkit-transform: scale(0); transform: scale(0); }
[type="radio"]:checked + label:after { opacity: 1; -webkit-transform: scale(1); transform: scale(1); }

.chk-box { display: block; position: relative; padding-left: 35px; cursor: pointer; line-height: 25px; user-select: none; }
.chk-box input[type=checkbox] { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
.checkmark { position: absolute; top: 0; left: 0; height: 25px; width: 25px; background-color: #eee; }
.chk-box:hover input[type=checkbox] ~ .checkmark { background-color: #ccc; }
.chk-box input[type=checkbox]:checked ~ .checkmark { background-color: #2196F3; }
.checkmark:after { content: ""; position: absolute; display: none; }
.chk-box input[type=checkbox]:checked ~ .checkmark:after { display: block; }
.chk-box .checkmark:after { left: 9px; top: 5px; width: 5px; height: 10px; border: solid white; border-width: 0 3px 3px 0; transform: rotate(45deg); }

/** basic theme - range */
input[type=range] { height: 25px; -webkit-appearance: none; margin: 10px 0; width: 100%; }
input[type=range]:focus { outline: none; }
input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 5px; cursor: pointer; animate: 0.2s; box-shadow: 0px 0px 0px #000000; background: #2497E3; border-radius: 1px; border: 0px solid #000000; }
input[type=range]::-webkit-slider-thumb { box-shadow: 0px 0px 0px #000000; border: 1px solid #2497E3; height: 18px; width: 18px; border-radius: 25px; background: #A1D0FF; cursor: pointer; -webkit-appearance: none; margin-top: -7px; }
input[type=range]:focus::-webkit-slider-runnable-track { background: #2497E3; }
input[type=range]::-moz-range-track { width: 100%; height: 5px; cursor: pointer; animate: 0.2s; box-shadow: 0px 0px 0px #000000; background: #2497E3; border-radius: 1px; border: 0px solid #000000; }
input[type=range]::-moz-range-thumb { box-shadow: 0px 0px 0px #000000; border: 1px solid #2497E3; height: 18px; width: 18px; border-radius: 25px; background: #A1D0FF; cursor: pointer; }
input[type=range]::-ms-track { width: 100%; height: 5px; cursor: pointer; animate: 0.2s; background: transparent; border-color: transparent; color: transparent; }
input[type=range]::-ms-fill-lower { background: #2497E3; border: 0px solid #000000; border-radius: 2px; box-shadow: 0px 0px 0px #000000; }
input[type=range]::-ms-fill-upper { background: #2497E3; border: 0px solid #000000; border-radius: 2px; box-shadow: 0px 0px 0px #000000; }
input[type=range]::-ms-thumb { margin-top: 1px; box-shadow: 0px 0px 0px #000000; border: 1px solid #2497E3; height: 18px; width: 18px; border-radius: 25px; background: #A1D0FF; cursor: pointer; }
input[type=range]:focus::-ms-fill-lower { background: #2497E3; }
input[type=range]:focus::-ms-fill-upper { background: #2497E3; }

/** bm: blank message */
@keyframes blank-msg { from { opacity: 0.3; } to { opacity: 1; } }
@keyframes blank-msg-open { from { max-height: 0; } to { max-height: 200px } }
.bm { animation: blank-msg .4s 3; }
.bm-open { animation: blank-msg-open .8s 1; }

/** spin : n = normal, f = fast, s = slow */
@keyframes spin { 100% { transform:rotate(360deg); } }
.spin-s { animation:spin 12s linear infinite; }
</style>
