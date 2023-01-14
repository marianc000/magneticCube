export function equals(o1, o2) {
   // console.log("comparing",o1,o2);
    const s1 = JSON.stringify(o1);
    const s2 = JSON.stringify(o2);
    if (s1 !== s2) throw "\n"+s1 + " !=\n" + s2;
}