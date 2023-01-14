export function clone(o){
    return JSON.parse(JSON.stringify(o));
}

export function index(el) {
    return [...el.parentElement.children].indexOf(el);
}