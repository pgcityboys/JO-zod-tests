import { z } from "./src";

// Test case 1
console.log("---CASE 1---");
const s1 = z.string();
const val1 = "ĄĆbńt"
console.log(s1.parse(val1));

// Test case 2
console.log("---CASE 2---");
const s2 = z.string().uuid();
const val2 = "550E8400-e29B-41d4-a71C-446A5544FF00"
console.log(s2.parse(val2));

// Test case 3
console.log("---CASE 3---");
const s3 = z.number().finite();
try {
    s3.parse(undefined);
}
catch (error){
    console.log("error");
}

// Test case 4
console.log("---CASE 4---");
const s4 = z.enum(['foo', 'bar'], {
    errorMap: () => ({message: "ERROR"})
})
try {
    s4.extract(['foo']).parse('incorrect');
}
catch (error) {
    console.log(error);
} 

// Test case 5
console.log("---CASE 5---");
const s5 = z.object({
    name: z.string(),
    surname: z.string()
})
const tmp2 = s5.extend({
    age: z.number()
})
console.log(s5.shape);
console.log(tmp2.keyof());


// Test case 6
console.log("---CASE 6---");
const s6 = z.record(z.any());
console.log(s6.parse({tmp3: undefined}));

z;
