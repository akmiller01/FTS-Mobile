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
function truncnumber(x) {
if(x>=1000000000){return (x/1000000000).toFixed(2)+"B"}
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
$(document).ready(function(){$('li.top em').hide();});