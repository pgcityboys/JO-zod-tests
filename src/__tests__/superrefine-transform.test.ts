// @ts-ignore TS6133
import { expect, test } from "@jest/globals";

import * as z from "../index";

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
  expect(schema.safeParse(b)).toBeTruthy()
  expect(schema.safeParse(c)).toBeFalsy()

})
