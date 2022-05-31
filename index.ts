import {Marie} from "./marie.ts";

const command = `
:a :b
       :c
       :d
       :e
    :f :g
`

const mp = new Marie({
  namespace: 'https://rgrannell.xyz/t/'
})

for await (const triple of mp.parse(command)) {
  console.log(triple.nquad());
}
