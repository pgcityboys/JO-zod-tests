// @ts-ignore TS6133
import { expect } from "https://deno.land/x/expect@v0.2.6/mod.ts";
const test = Deno.test;

import * as z from "../index.ts";

test("transform + superrefine", () => {
  const schema = z
    .object({name: z.string().min(6)})
    .transform((arg, _) => {return {notAName: arg.name}})
    .superRefine((arg, ctx) => {
      if (arg.notAName[0] !== 'a') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "It should start with letter 'a'",
          path: ["notAName"],
        })
      }
    })
  const a = {name: "anonse"};
  const b = {name: "inaczej"};
  const c = {name: "aktyw"};

  expect(schema.safeParse(a)).toBeTruthy()
  expect(schema.safeParse(b)).toBeFalsy()
  expect(schema.safeParse(c)).toBeFalsy()

})
