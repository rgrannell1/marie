#! /usr/bin/env zsh

TGT=/usr/bin/marie

echo '#!/bin/sh'                                                 | sudo tee    "$TGT" > /dev/null
echo '//bin/true; exec /home/rg/.deno/bin/deno run -A "$0" "$@"' | sudo tee -a "$TGT" > /dev/null

deno bundle src/cli.ts | sudo tee -a "$TGT" > /dev/null && sudo chmod +x "$TGT" > /dev/null

