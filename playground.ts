import { z } from "./src";

// Test case 1
console.log("---CASE 1---");
const s1 = z.string();
const val1 = "ĄĆbńt";
console.log(s1.parse(val1));

// Test case 2
console.log("---CASE 2---");
const s2 = z.string().uuid();
const val2 = "550E8400-e29B-41d4-a71C-446A5544FF00";
console.log(s2.parse(val2));

// Test case 3
console.log("---CASE 3---");
const s3 = z.number().finite();
try {
  s3.parse(undefined);
} catch (error) {
  console.log("error");
}

// Test case 4
console.log("---CASE 4---");
const s4 = z.enum(["foo", "bar"], {
  errorMap: () => ({ message: "ERROR" }),
});
try {
  s4.extract(["foo"]).parse("incorrect");
} catch (error) {
  console.log(error);
}

// Test case 5
console.log("---CASE 5---");
const s5 = z.object({
  name: z.string(),
  surname: z.string(),
});
const tmp2 = s5.extend({
  age: z.number(),
});
console.log(s5.shape);
console.log(tmp2.keyof());

// Test case 6
console.log("---CASE 6---");
const s6 = z.record(z.any());
console.log(s6.parse({ tmp3: undefined }));

// Test case 7
console.log("---CASE 7---");
const s7 = z.string().ip();
console.log(s7.parse("ff06::3:0:c3"));

//Test case 8 - enum test
console.log("--CASE 8---");
const schema_enum = ["Adam", "Tymek", "Łukasz"] as const;
const test_enum = ["Adam", "Tymek", "Łukasz", "Mateusz"] as const;
const s8 = z.enum(schema_enum);
test_enum.forEach((element) => {
  try {
    console.log("succesfuly parsed element: " + s8.parse(element));
  } catch {
    console.log("error with parsed element: " + element);
  }
});

// Test case 9
console.log("---CASE 9---");
function tmp4() {}
const s9 = z.string();
console.log(s9.safeParse(tmp4));

//Test case 10
console.log("---CASE 10---");
const minDate = new Date("2022-01-01");
const maxDate = new Date("2022-12-31");
const s10 = z.date().min(minDate).max(maxDate);
const testDates = [
  new Date("2021-12-31"),
  new Date("2023-01-01"),
  new Date("2022-06-15"),
];
testDates.forEach((date) => {
  try {
    console.log("Successfully parsed date: " + s10.parse(date));
  } catch {
    console.log("Error with parsed date: " + date);
  }
});

//Test case 11

//Test case 12
const url = "amqp://guest@guest/local";
const schema = z.string().url();
console.log(schema.safeParse(url))
