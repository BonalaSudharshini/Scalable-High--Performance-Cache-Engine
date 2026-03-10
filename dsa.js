class LRUCache{

constructor(limit){

this.limit = limit
this.cache = new Map()

}

get(key){

if(!this.cache.has(key))
return null

let value = this.cache.get(key)

this.cache.delete(key)
this.cache.set(key,value)

return value

}

put(key,value){

if(this.cache.has(key)){

this.cache.delete(key)

}

else if(this.cache.size >= this.limit){

let firstKey = this.cache.keys().next().value
this.cache.delete(firstKey)

}

this.cache.set(key,value)

}

}



function linearSearch(arr,target){

for(let i=0;i<arr.length;i++){

if(arr[i]===target)
return i

}

return -1

}