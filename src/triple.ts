import { TermParse } from "./types.ts";

export class Triple {
  subject: string;
  predicate: string;
  object: string;
  basename?: string;

  constructor(subject: TermParse, predicate: TermParse, object: TermParse) {
    this.subject = subject.term;
    this.predicate = predicate.term;
    this.object = object.term;
  }

  setBasename(basename: string) {
    this.basename = basename;
    return this;
  }

  encode(escape?: boolean) {
    const base = (this.basename ?? '')

    if (escape) {
      return [
        base + encodeURIComponent(this.subject),
        base + encodeURIComponent(this.predicate),
        base + encodeURIComponent(this.object)
      ]
    } else {
      return [
        base + this.subject,
        base + this.predicate,
        base + this.object
      ]
    }
  }

  // todo make this safe
  nquad() {
    const [subject, predicate, object] = this.encode();
    return `<${subject}> <${predicate}> <${object}> .`
  }

  ndjson(escape: boolean) {
    const [subject, predicate, object] = this.encode(escape);

    return JSON.stringify({ subject, predicate, object })
  }
}
