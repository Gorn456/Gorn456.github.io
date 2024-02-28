const number = 65 ;

const hex  =  "\\u{" + number.toString(16).padStart(4, "0") + "}" ;

console.log(hex) ;
