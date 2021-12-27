function reactive(object) {
    return object;
}
var foo = reactive({ bar: 'bar' });
console.log(reactive.length);
function sayLength(val) {
    console.log(val.length);
}
