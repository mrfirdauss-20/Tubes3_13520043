export const convertDateUsingRegex = (value: string) => {
  const regDate = /\d{4}[-]\d{2}[-]\d{2}/g;
  const date = value.match(regDate);
  return date;
}

export const isValidSequenceDNA = (sequence: string | ArrayBuffer | null) => {
  if (typeof(sequence)=="string") {
    const invalidSequenceDNA = /[^AGCT]/g;
    const isInvalidSequenceDNA = sequence.match(invalidSequenceDNA);
    if (isInvalidSequenceDNA) throw new Error("Invalid Sequence DNA");
  } else {
    throw new Error("Invalid Sequence DNA")
  }
}