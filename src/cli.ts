import {Marie} from "./marie.ts";
import docopt from "https://deno.land/x/docopt@v1.0.1/dist/docopt.mjs";


const CLI = `
Usage:
  marie <fpath> [--nquad|--ndjson] [--basename=<string>] [--no-escape]

Description:
  This CLI parses a target file containing marie markup and extracts semantic data in several formats

  Marie is an line-delimited RDF serialisation format designed to be embedded in plain text notes. It allows you to
  add semantic data "in band" in a markdown or plain-text file, without badly affecting readability or clashing
  with existing markdown syntax.

Options:
  --basename=<string>    a basename of your RDF vocabulary. If added, all marie triples will be prepended with this
                             URI path. For example, --basename 'http://example.com#'
  --nquad                output triples in nquad format
  --ndjson               output a line-delimited stream of JSON objects, with keys 'subject', 'object', and 'predicate'
  --no-escape            do not URL escape components. Only allowed when --ndjson is selected
  -h, --help               show this documentation
`

export async function main() {
  const args = docopt(CLI);
  const command = await Deno.readTextFile(args['<fpath>'])

  const mp = new Marie({
    namespace: args['--basename']
  })

  let format = 'ndjson'
  if (args['--nquad']) {
    format = 'nquad'
  }
  const escape = !args['--no-escape']

  for await (const triple of mp.parse(command)) {
    console.log((triple as any)[format](escape));
  }
}

main()
