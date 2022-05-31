
import { parse, parseFile } from "./parser.ts";


type MarieConfiguration = {
  namespace: string
}

export class Marie {
  config: MarieConfiguration
  constructor (config: MarieConfiguration) {
    this.config = config;
  }

  async *parse (content: string) {
    for await (const triple of parse(content)) {
      triple.setBasename(this.config.namespace)
      yield triple
    }
  }

  async *parseFile (fpath: string) {
    for await (const triple of parseFile(fpath)) {
      triple.setBasename(this.config.namespace)
      yield triple
    }
  }
}
