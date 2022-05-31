import { Frame, TermParse } from "./types.ts";
import { Triple } from './triple.ts';

const terms = /:([^:]*[^:\s])/g;

const linesToBlocks = (lines: string[]) => {
  const blocks: any = [[]];
  for (const line of lines) {
    let lineTerms: TermParse[] = [];

    for (const match of line.matchAll(terms)) {
      lineTerms.push({
        term: match[1],
        index: match.index as number,
        line,
      });
    }

    if (lineTerms.length > 0) {
      blocks[blocks.length - 1].push(lineTerms);
    } else {
      blocks.push([]);
    }
  }

  return blocks;
};

export function* parse(content: string) {
  const lines = content.split(/\r\n|\n/g);
  const blocks = linesToBlocks(lines);

  // expand contextually
  for (const block of blocks) {
    if (block.length === 0) {
      continue;
    }

    const frame: Frame<TermParse> = {
      cursor: "subject",
    };

    for (const line of block) {
      if (line.length > 4) {
        throw new Error(`too many terms in line` + JSON.stringify(line));
      } else if (line.length === 3) {
        // ignore frame information, and yield this line as a triple directly
        yield new Triple(line[0], line[1], line[2]);
      } else if (line.length === 2) {
        // there are two terms in the line
        if (frame.cursor === "subject") {
          frame.subject = line[0];
          frame.predicate = line[1];
          frame.cursor = "object";
        } else if (frame.cursor === "predicate" || frame.cursor === "object") {
          // enough information to field information

          yield new Triple(frame.subject as TermParse, line[0], line[1]);
        }
      } else if (line.length === 1) {
        if (frame.cursor === "object") {
          // subject, predicate are present in the frame, so there is
          // enough information to yield a triple
          yield new Triple(
            frame.subject as TermParse,
            frame.predicate as TermParse,
            line[0],
          );
        } else if (frame.cursor === "predicate") {
          // subject is already in frame, set the predicate
          frame.predicate = line[0];
          frame.cursor = "object";
        } else if (frame.cursor === "subject") {
          // nothing is in the frame, set the subject
          frame.subject = line[0];
          frame.cursor = "predicate";
        }
      } else if (line.length === 0) {
        throw new Error(
          `no terms in line added to block; parser error.` +
            JSON.stringify(line),
        );
      }
    }
  }
}

export async function* parseFile(fpath: string) {
  const content = await Deno.readTextFile(fpath);
  for (const triple of parse(content)) {
    yield triple;
  }
}

