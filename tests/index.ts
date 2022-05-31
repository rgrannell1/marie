
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {Marie} from "../src/marie.ts";
import { Triple } from "../src/triple.ts";

type TripleTestCase = {
  description: string,
  document: string,
  triples: string[][]
}

const cases: TripleTestCase[] = []
cases.push({
  description: 'incomplete triple',
  document: `
  :a :b
  `,
  triples: []
})

cases.push({
  description: 'valid triple with delimited names',
  document: `
    :a b c     :b-c-d    :e
  `,
  triples: [
   ['a b c', 'b-c-d', 'e']
  ]
})

cases.push({
  description: 'three valid triples in two blocks',
  document: `
    :a :b :c
    :d :e :f

    :g :h      :i
    :j
  `,
  triples: [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i']
  ]
})

cases.push({
  description: 'contextual triples',
  document: `
  :a
    :b
      :c
      :d
      :e
    :f :g
  :h :i :j
  `,
  triples: [
    ['a', 'b', 'c'],
    ['a', 'b', 'd'],
    ['a', 'b', 'e'],
    ['a', 'f', 'g'],
    ['h', 'i', 'j'],
  ]
})


const runTripleTest = async (tcase: TripleTestCase) => {
  const md = new Marie({
    namespace: ''
  })

  const triples: string[][] = [];

  for await (const triple of md.parse(tcase.document)) {
    triples.push([triple.subject, triple.predicate, triple.object])
  }

  if (triples.length !== tcase.triples.length) {
    throw new Error(`expected ${tcase.triples.length} triples, received ${triples.length}. For test-case:\n${tcase.document}`)
  }

  for (let idx = 0; idx < triples.length; ++idx) {
    let actual = triples[idx]
    let expected = tcase.triples[idx]

    if (actual.length !== 3) {
      throw new Error(`expected three elements in triple ${actual}`)
    }

    assertEquals(actual[0], expected[0])
    assertEquals(actual[1], expected[1])
    assertEquals(actual[2], expected[2])
  }
}


for (const tcase of cases) {
  Deno.test(`Triple Extraction Test: "${tcase.description}"`, async () => {
    await runTripleTest(tcase)
  });
}
