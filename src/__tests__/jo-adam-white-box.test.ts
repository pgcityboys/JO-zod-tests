// @ts-ignore TS6133
import { expect, test } from "@jest/globals";

import * as z from "../index";

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
