Array.prototype.containsdonor = function(v) {
for(var i = 0; i < this.length; i++) {
    if(this[i].donor === v) return true;} return false;};
Array.prototype.containsrecipient = function(v) {
for(var i = 0; i < this.length; i++) {
    if(this[i].recipient === v) return true;} return false;};
Array.prototype.containscluster = function(v) {
for(var i = 0; i < this.length; i++) {
    if(this[i].cluster === v) return true;} return false;};
Array.prototype.contains = function(v) {
for(var i = 0; i < this.length; i++) {
    if(this[i] === v) return true;} return false;};
function GetUrlValue(VarSearch){
var SearchString = window.location.search.substring(1);
var VariableArray = SearchString.split('&');
for(var i = 0; i < VariableArray.length; i++){
var KeyValuePair = VariableArray[i].split('=');
if(KeyValuePair[0] == VarSearch){
return KeyValuePair[1];}}}
function truncnumbermagnitude(x) {
if(x>=10000000000){magnitude="BILLION";return (x/1000000000).toFixed(1)}
if(x<10000000000&x>=1000000000){magnitude="BILLION";return (x/1000000000).toFixed(2)}
if(x<1000000000&x>=100000000){magnitude="MILLION"; return (x/1000000).toFixed(0)}
if(x<100000000&x>=10000000){magnitude="MILLION"; return (x/1000000).toFixed(1)}
if(x<10000000&x>=1000000){magnitude="MILLION"; return (x/1000000).toFixed(2)}
if(x<1000000&x>=100000){magnitude="THOUSAND"; return (x/1000).toFixed(0)}
if(x<100000&x>=10000){magnitude="THOUSAND"; return (x/1000).toFixed(1)}
if(x<1000000&x>=1000){magnitude="THOUSAND"; return (x/1000).toFixed(2)}
if(x<1000){magnitude=""; return (x)};}
function truncnumber(x) {
if(x>=10000000000){return (x/1000000000).toFixed(1)+"B"}
if(x<10000000000&x>=1000000000){return (x/1000000000).toFixed(2)+"B"}
if(x<1000000000&x>=100000000){return (x/1000000).toFixed(0)+"M"}
if(x<100000000&x>=10000000){return (x/1000000).toFixed(1)+"M"}
if(x<10000000&x>=1000000){return (x/1000000).toFixed(2)+"M"}
if(x<1000000&x>=100000){return (x/1000).toFixed(0)+"K"}
if(x<100000&x>=10000){return (x/1000).toFixed(1)+"K"}
if(x<1000000&x>=1000){return (x/1000).toFixed(2)+"K"}
if(x<1000){return (x)};}
function numberWithCommas(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
function populatelist(types,years){
if(types=="appeal"){data = appeal.filter(function(d){return d.year==parseFloat(years)})}
else{data = emergency.filter(function(d){return d.year==parseFloat(years)})}
data = data.sort(function(a, b){var keyA = a.title.toUpperCase(),keyB = b.title.toUpperCase();if(keyA < keyB) return -1;if(keyA > keyB) return 1;return 0;});
for(i=0;i<data.length;i++){data[i].label=0}
data.unshift({"title":data[0].title.charAt(0),"label":1})
for(i=0;i<data.length-1;i++){
        if(data[i].title.charAt(0)==data[i+1].title.charAt(0)){}
        else{data.splice(i+1,0,{"title":data[i+1].title.charAt(0),"label":1})}}
for(i=0;i<data.length;i++){
        if(types=="appeal"){
        if(data[i].label==0){
        $('ul#'+types+years).append("<li><a href='appeal.html?id="+data[i].id+"' id='"+data[i].id+"'>"+data[i].title+"</a></li>")}
        else{$('ul#'+types+years).append("<li class='Label'>"+data[i].title.toUpperCase()+"</li>")}}
        else{if(data[i].label==0){
        $('ul#'+types+years).append("<li><a href='emergency.html?id="+data[i].id+"' id='"+data[i].id+"'>"+data[i].title+"</a></li>")}
        else{$('ul#'+types+years).append("<li class='Label'>"+data[i].title.toUpperCase()+"</li>")}}}}
poporg = function (orgtype,elementid){
data = organization
data = data.sort(function(a, b){var keyA = a.name.toUpperCase(),keyB = b.name.toUpperCase();if(keyA < keyB) return -1;if(keyA > keyB) return 1;return 0;});
for(i=0;i<data.length;i++){data[i].label=0}
data.unshift({"name":data[0].name.charAt(0),"label":1})
for(i=0;i<data.length-1;i++){
        if(data[i].name.charAt(0)==data[i+1].name.charAt(0)){}
        else{data.splice(i+1,0,{"name":data[i+1].name.charAt(0),"label":1})}}
for(i=0;i<data.length;i++){
        if(data[i].label==0){$('ul#'+elementid).append("<li><a href='org.html?id="+data[i].id+"&year=2013' id='"+data[i].id+"'>"+data[i].name+" ("+data[i].abbreviation+")</a></li>")}
        else{$('ul#'+elementid).append("<li class='Label'>"+data[i].name+"</li>")}
}}
$(function() {
$('nav#menu').mmenu({
        counters: true
});
});
$(document).ready(function(){$('li.top em').text("BY YEAR");
                  $('li.types em').hide();});
donutindex = 0
donut = function(radius,covered,text1,text2,parent){
$(document).ready(function(){
    if(covered>=1){covered=.999999}
    if(covered<=0){covered=.000001}
    var percentremain = 1-covered,
    a = Math.PI*2*percentremain,
    r = radius,
    x= -r + (r*(Math.cos(a))),
    y= (r*(Math.sin(a)));

$(parent).append("<svg viewBox='0 0 "+radius*2+" "+radius*2+"' id='donut'><g transform='translate("+radius*2+","+radius*2+") scale(1,-1) rotate(90)'><path fill='#0094cc' class='remain' id='donut"+donutindex+"'/><path fill='#0f6cb6' class='commit' id='donut"+donutindex+"'/><circle fill='#11c0f3' r='"+radius*(3/5)+"' cx='"+radius+"' cy='"+radius+"'/></g><text id='text1' fill='#FFF' x='"+parseFloat(radius-27)+"' y='"+parseFloat(radius+4)+"' font-size='25'>"+text1+"</text><text id='text2' fill='#FFF' x='"+parseFloat(radius-25)+"' y='"+parseFloat(radius+15)+"'>"+text2+"</text></svg>")

if (percentremain>0.5) {$("path#donut"+donutindex+".remain").attr("d","M"+r+","+r+" h"+r+" a"+r+","+r+" 0 1,1 "+x+","+y+" z")}
else {$("path#donut"+donutindex+".remain").attr("d","M"+r+","+r+" h"+r+" a"+r+","+r+" 0 0,1 "+x+","+y+" z")}
if (1-percentremain<0.5) {$("path#donut"+donutindex+".commit").attr("d","M"+r+","+r+" h"+r+" a"+r+","+r+" 0 0,0 "+x+","+y+" z")}
else {$("path#donut"+donutindex+".commit").attr("d","M"+r+","+r+" h"+r+" a"+r+","+r+" 0 1,0 "+x+","+y+" z")}
donutindex +=1
});}
progressbar = function(covered,width,height){
if(covered>1){covered=1}
if(covered<0){covered=0}
var coveredwidth = Math.round(width*covered),
coveredfill = covered==1?"#f26522":"#fcaf17",
progressbar = "<svg id='progressbar' viewBox='0 0 "+width+" "+height+"'><rect id='total' width='"+width+"' height='"+height+"' fill='#ffe9b5'/><rect id='covered' width='"+coveredwidth+"' height='"+height+"' fill='"+coveredfill+"'/></svg>";
return progressbar;
}