
# Marie

Marie is an line-delimited [RDF](https://www.w3.org/TR/rdf11-concepts) serialisation format designed to be embedded in plain text notes. It allows you to add semantic data "in band" in a markdown or plain-text file, without badly affecting readability or clashing with existing markdown syntax.

## Example

This document is itself valid Marie markup, and encodes a small semantic graph describing Marie.

```
:marie
       :inputs
                :plain text
                :markdown
                :any file
       :outputs :rdf
       :outputs
                :nquads
                :json
                :text
       :written-in
                :Deno
```

## License

The MIT License

Copyright (c) 2022 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
