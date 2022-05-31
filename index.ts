import {Marie} from "./marie.ts";

const command = await Deno.readTextFile('README.md')

const mp = new Marie({
  namespace: 'https://mydomain.xyz/t/'
})

for await (const triple of mp.parse(command)) {
  console.log(triple.nquad());
}
