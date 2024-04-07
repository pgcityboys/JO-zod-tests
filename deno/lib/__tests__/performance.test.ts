// @ts-ignore TS6133
import { expect } from "https://deno.land/x/expect@v0.2.6/mod.ts";
const test = Deno.test;

import * as z from "../index.ts";

test("simple object", () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    age: z.number().positive()
  });

  type SchemaType = z.infer<typeof schema>;

  const passingObject: SchemaType = {
    email: "test@mail.com",
    password: "samplePassword",
    age: 23
  }

  const start = Date.now();
  for (let i = 0; i<1000000; i++) {
    schema.parse(passingObject)
  }
  const duration = Date.now() - start;

  // timeout = 30s
  expect(duration).toBeLessThanOrEqual(30000);
})

test("complex object", () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    age: z.number().positive(),
    payload: z.object({
      id: z.string().uuid(),
      date: z.string().date(),
      address: z.string().ip(),
      stuff: z.object({
        data: z.string().optional()
      })
    })
  });

  type SchemaType = z.infer<typeof schema>;

  const passingObject: SchemaType = {
    email: "test@mail.com",
    password: "samplepassword",
    age: 23,
    payload:{
      id: "7c94cfff-7702-4b11-84f7-5dc057704071",
      date: "2000-01-01",
      address: "192.168.0.1",
      stuff: {}
    }
  }

  const start = Date.now();
  for (let i = 0; i<500000; i++) {
    schema.parse(passingObject)
  }
  const duration = Date.now() - start;

  // timeout = 30s
  expect(duration).toBeLessThanOrEqual(30000);
})

