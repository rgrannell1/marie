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

  // todo make this safe
  nquad() {
    const subject = (this.basename ?? '') + encodeURIComponent(this.subject);
    const predicate = (this.basename ?? '') + encodeURIComponent(this.predicate);
    const object = (this.basename ?? '') + encodeURIComponent(this.object);

    return `<${subject}> <${predicate}> <${object}> .`
  }
}
