// @ts-ignore TS6133
import { expect, test } from "@jest/globals";

import * as z from "../index";

test("emoji", () => {
  const schema = z.object({name: z.string().min(5).max(10)});
  
  const a = {name: "good name"}
  const b = {name: "toolongofaname"}
  const c = {name: "🍆 💦"}
  const d = {name: "🍆 💦🥵 🤼‍♂️ 👯‍♂️ 🤤"}

  expect(() => schema.parse(a)).toBeTruthy()
  expect(() => schema.parse(b)).toThrow()
  expect(() => schema.parse(c)).toThrow()
  expect(() => schema.parse(d)).toBeTruthy()
})
