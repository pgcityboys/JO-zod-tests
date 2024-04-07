// @ts-ignore TS6133
import { expect } from "https://deno.land/x/expect@v0.2.6/mod.ts";
const test = Deno.test;

import * as z from "../index.ts";

test("email without exclamation mark", () => {
  const schema = z.string().email();

  const emailWithoutExclamation = "test@mail.com";

  expect(schema.safeParse(emailWithoutExclamation).success).toBe(true);
});

test("email with exclamation mark", () => {
  const schema = z.string().email();

  const emailWithExclamation = "test!@mail.com";

  expect(schema.safeParse(emailWithExclamation).success).toBe(true);
});
