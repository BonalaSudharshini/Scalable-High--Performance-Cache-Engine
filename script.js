// ================= GLOBAL METRICS =================
let hits = 0;
let misses = 0;
let usageHistory = [];
let chart;

// ================= NODE CLASS =================
class Node {
constructor(key, value) {
this.key = key;
this.value = value;
this.prev = null;
this.next = null;
}
}

// ================= DOUBLY LINKED LIST =================
class DoublyLinkedList {

constructor() {
this.head = null;
this.tail = null;
}

addToFront(node) {

node.next = this.head;
node.prev = null;

if (this.head) this.head.prev = node;
this.head = node;

if (!this.tail) this.tail = node;

}

removeNode(node) {

if (node.prev) node.prev.next = node.next;
else this.head = node.next;

if (node.next) node.next.prev = node.prev;
else this.tail = node.prev;

}

moveToFront(node) {

this.removeNode(node);
this.addToFront(node);

}

removeLast() {

if (!this.tail) return null;

const oldTail = this.tail;
this.removeNode(oldTail);
return oldTail;

}

display() {

let current = this.head;
let arr = [];

while (current) {

arr.push(`${current.key}:${current.value}`);
current = current.next;

}

return arr;

}

}

// ================= LRU CACHE =================
class LRUCache {

constructor(capacity) {

this.capacity = capacity;
this.map = new Map();
this.list = new DoublyLinkedList();

this.operationStack = [];
this.evictionQueue = [];

this.evictionCount = 0;

}

get(key) {

if (!this.map.has(key)) {

misses++;
this.operationStack.push(`GET Miss: ${key}`);
return null;

}

hits++;

const node = this.map.get(key);
this.list.moveToFront(node);

this.operationStack.push(`GET Hit: ${key}`);

return node.value;

}

put(key, value) {

if (this.map.has(key)) {

const node = this.map.get(key);

node.value = value;
this.list.moveToFront(node);

this.operationStack.push(`UPDATE: ${key}`);

}
else {

const newNode = new Node(key, value);

if (this.map.size >= this.capacity) {

const removed = this.list.removeLast();

if (removed) {

this.map.delete(removed.key);
this.evictionQueue.push(removed.key);
this.evictionCount++;

}

}

this.list.addToFront(newNode);
this.map.set(key, newNode);

this.operationStack.push(`PUT: ${key}`);

}

}

delete(key) {

if (!this.map.has(key)) return false;

const node = this.map.get(key);

this.list.removeNode(node);
this.map.delete(key);

this.operationStack.push(`DELETE: ${key}`);

return true;

}

clear() {

this.map.clear();
this.list = new DoublyLinkedList();

this.operationStack = [];
this.evictionQueue = [];

hits = 0;
misses = 0;

this.operationStack.push("CLEAR ALL");

}

}

// ================= INITIAL CACHE =================
let cache = new LRUCache(500);

// ================= UI FUNCTIONS =================

function setCapacity() {

const cap = parseInt(document.getElementById("capacityInput").value);

if (cap > 0) {

cache = new LRUCache(cap);

hits = 0;
misses = 0;
usageHistory = [];

updateUI();

}

}

function putValue() {

const key = document.getElementById("keyInput").value;
const value = document.getElementById("valueInput").value;

if (!key || !value) {

alert("Enter key and value");
return;

}

cache.put(key, value);

updateUI();

}

function getValue() {

const key = document.getElementById("keyInput").value;

if (!key) {

alert("Enter key");
return;

}

const value = cache.get(key);

if (value === null) alert("Key Not Found");
else alert("Value: " + value);

updateUI();

}

function deleteKey() {

const key = document.getElementById("keyInput").value;

if (!key) return;

cache.delete(key);

updateUI();

}

function clearCache() {

cache.clear();
updateUI();

}

// ================= UPDATE UI =================

function updateUI() {

// Cache Display

document.getElementById("cacheDisplay").innerHTML =
cache.list.display()
.map(item => `<div class="cache-item">${item}</div>`)
.join("");

// Stats

const total = hits + misses;

const hitRatio =
total === 0 ? 0 :
((hits / total) * 100).toFixed(2);

document.getElementById("stats").innerHTML = `

Size: ${cache.map.size}<br>
Capacity: ${cache.capacity}<br>
Hits: ${hits}<br>
Misses: ${misses}<br>
Evictions: ${cache.evictionCount}

<div class="progress-bar">
<div class="progress-fill" style="width:${hitRatio}%"></div>
</div>

Hit Ratio: ${hitRatio}%

`;

// Operation History

const historyDiv = document.getElementById("history");

if(historyDiv){

historyDiv.innerHTML =
cache.operationStack
.slice(-10)
.reverse()
.map(op=>`<div class="history-item">${op}</div>`)
.join("");

}

// Evictions

const evictDiv = document.getElementById("evictions");

if(evictDiv){

evictDiv.innerHTML =
cache.evictionQueue
.slice(-10)
.map(k=>`<span class="eviction-item">${k}</span>`)
.join("");

}

// Chart

usageHistory.push(cache.map.size);

updateChart();

}

// ================= CHART =================

window.onload = function () {

const ctx = document.getElementById("cacheChart").getContext("2d");

chart = new Chart(ctx, {

type: "line",

data: {

labels: [],

datasets: [{

label: "Cache Size Over Time",

data: [],

borderColor: "red",
fill: false

}]

},

options: {

responsive: true

}

});

};

function updateChart() {

if (!chart) return;

chart.data.labels.push(chart.data.labels.length + 1);
chart.data.datasets[0].data.push(cache.map.size);

chart.update();

}

// ================= THEME =================

function toggleTheme() {

document.body.classList.toggle("light-mode");

}

// ================= EXPORT CACHE =================

function exportCache() {

const data = JSON.stringify([...cache.map.entries()], null, 2);

const blob = new Blob([data], { type: "application/json" });

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);
a.download = "cache-data.json";

a.click();

}

// ================= IMPORT CACHE =================

function importCache(){

const file = document.getElementById("importFile").files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const data = JSON.parse(e.target.result);

cache.clear();

data.forEach(([key,node])=>{
cache.put(key,node.value);
});

updateUI();

};

reader.readAsText(file);

}

// ================= BENCHMARK TEST =================

function runBenchmark(){

const operations = 1000;

const start = performance.now();

for(let i=0;i<operations;i++){

const rand = Math.random();

if(rand < 0.5){

cache.put("key"+Math.floor(Math.random()*1000),"val"+i);

}
else{

cache.get("key"+Math.floor(Math.random()*1000));

}

}

const end = performance.now();

document.getElementById("benchmarkResult").innerHTML =

`Operations: ${operations}<br>
Time: ${(end-start).toFixed(2)} ms`;

updateUI();

}