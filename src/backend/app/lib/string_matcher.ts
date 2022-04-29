import { db } from "../db/db";
import { RowDataPacket } from "mysql2";

interface KnuthMorrisPrattPattern {
  pattern: string;
  borderValue: number[];
}

interface BoyerMoorePattern {
  pattern: string;
  lastOccurenceMap: Map<string, number[]>;
}

export class KnuthMorrisPratt {
  // border data maps the name of a disease and array of number that map index as k and the returned value of
  // the border function
  static borderData: Map<number, number[]> = new Map();
  static async loadData() {
    let queryStr = "SELECT * FROM nilai_border"
    db.query(
      queryStr,
      (err, results) => {
        if (err) {
          console.log(err.message)
        }
        const rows = <RowDataPacket>results;
        rows?
          rows.forEach((val) => {
            //console.log(val.nilai_border);
            //console.log("Parsed: ",JSON.parse(JSON.stringify(val.nilai_border)));
            this.borderData.set(val.id_penyakit,JSON.parse(JSON.stringify(val.nilai_border)));
          })
          :
          console.log("rows kosong");
        console.log("Nilai Border Loaded")
      }
    )
  }
  static find(pattern: KnuthMorrisPrattPattern, text: string): number {
    let textPointer: number = 0;
    let patternPointer: number = 0;
    let patternText: string = pattern.pattern;
    let patternLength: number = patternText.length;

    while (textPointer < text.length) {
      if (patternText[patternPointer] == text[textPointer]) {
        if (patternPointer == patternLength - 1) {
          return textPointer - patternLength + 1;
        }
        patternPointer++;
        textPointer++;
      } else if (patternPointer > 0) {
        patternPointer = pattern.borderValue[patternPointer - 1];
      } else {
        textPointer++;
      }
    }
    return -1;
  }

  static findAll(pattern: KnuthMorrisPrattPattern, text: string): number[] {
    let foundPosition: number[] = [];
    let textPointer: number = 0;
    let patternPointer: number = 0;
    let patternText: string = pattern.pattern;
    let patternLength: number = patternText.length;

    while (textPointer < text.length) {
      if (patternText[patternPointer] == text[textPointer]) {
        if (patternPointer == patternLength - 1) {
          foundPosition.push(textPointer - patternLength + 1);
          // assign patterPointer to the position of pattern that has longest same value with the prefix
          // patternPointer = pattern.borderValue[patternPointer];
          patternPointer = 0
          textPointer++
        } else {
          patternPointer++;
        }
        textPointer++;
      } else if (patternPointer > 0) {
        patternPointer = pattern.borderValue[patternPointer - 1];
      } else {
        textPointer++;
      }
    }
    return foundPosition;
  }

  static border(pattern: string): number[] {
    let borderValues: number[] = [];
    let k: number = 0;
    let i: number;
    let longest: number = 0;

    while (k < pattern.length - 1) {
      i = k;
      while (i >= 1) {
        if (pattern.slice(i, k + 1) == pattern.slice(0, k - i + 1)) {
          longest = k - i + 1;
        }
        i--;
      }
      borderValues.push(longest);
      k++;
    }
    return borderValues;
  }
}

export class BoyerMoore {
  static lastOccurenceData: Map<number, Map<string, number[]>> = new Map();
  static async loadData() {
    let queryStr = "SELECT * FROM peta_last_occurence"
    db.query(
      queryStr,
      (err, results) => {
        if (err) {
          console.log(err.message)
        }
        const rows = <RowDataPacket>results;
        rows?
          rows.forEach((val) => {
            this.lastOccurenceData.set(val.id_penyakit, JSON.parse(JSON.stringify(val.peta_last_occurence)));
          })
        :
          console.log("rows kosong");
        //console.log("Nilai last occurence Loaded")
      }
    )
  }
  static lastOccurence(pattern: string): Map<string, number[]> {
    let lastOccurenceMap: Map<string, number[]> = new Map<string, number[]>();
    for (let i: number = 0; i < pattern.length; i++) {
      if (!lastOccurenceMap.has(pattern[i])) {
        lastOccurenceMap.set(pattern[i], [i]);
      } else {
        lastOccurenceMap.get(pattern[i])?.push(i);
      }
    }
    return lastOccurenceMap;
  }

  static last(
    wrongCharacter: string,
    j: number,
    lastOccurenceMap: Map<string, number[]>
  ): number {
    if (!lastOccurenceMap.has(wrongCharacter)) {
      return -1;
    } else {
      let leftOccurences: any = lastOccurenceMap
        .get(wrongCharacter)
        ?.filter((v) => v < j);
      let rightOccurences: any = lastOccurenceMap
        .get(wrongCharacter)
        ?.filter((v) => v > j);
      return leftOccurences.length != 0
        ? leftOccurences[leftOccurences.length - 1]
        : rightOccurences.length != 0
        ? rightOccurences[0]
        : -1;
    }
  }

  static find(pattern: BoyerMoorePattern, text: string): number {
    let patternText: string = pattern.pattern;

    let patternPointer: number = patternText.length - 1;
    let textPointer: number = patternText.length - 1;

    while (textPointer < text.length) {
      if (text[textPointer] == patternText[patternPointer]) {
        if (patternPointer == 0) {
          return textPointer
        } else {
          textPointer--
          patternPointer--
        }
      } else {
        textPointer = textPointer + patternText.length - Math.min(patternPointer, 1+this.last(text[textPointer], patternPointer, pattern.lastOccurenceMap))
        patternPointer = patternText.length - 1
      }
    }

    return -1;
  }

  static findAll(pattern: BoyerMoorePattern, text: string): number[] {
    let patternText: string = pattern.pattern;

    let patternPointer: number = patternText.length - 1;
    let textPointer: number = patternText.length - 1;

    let result: number[] = [];
    while (textPointer < text.length) {
      if (text[textPointer] == patternText[patternPointer]) {
        if (patternPointer == 0) {
          result.push(textPointer)
          textPointer = textPointer + 2*patternText.length - 1
          patternPointer = patternText.length - 1
        } else {
          textPointer--
          patternPointer--
        }
      } else {
        textPointer = textPointer + patternText.length - Math.min(patternPointer, 1+this.last(text[textPointer], patternPointer, pattern.lastOccurenceMap))
        patternPointer = patternText.length - 1
      }
    }

    return result;
  }
}


// console.log(BoyerMoore.find({
//   pattern: "njay",
//   lastOccurenceMap: BoyerMoore.lastOccurence("njay")
// }, "v anjay luar biasa"))

// console.log(KnuthMorrisPratt.find({
//   pattern: "njay",
//   borderValue: KnuthMorrisPratt.border("njay")
// }, "v anjay luar biasa"))

// console.log(KnuthMorrisPratt.findAll({
//   pattern: "a",
//   borderValue: KnuthMorrisPratt.border("a")
// }, "v anjay luar biasa"))

// console.log(BoyerMoore.findAll({
//   pattern: "a",
//   lastOccurenceMap: BoyerMoore.lastOccurence("a")
// }, "v anjay luar biasa"))

export function levensthein(pattern: string, text: string): number {
  let patternLength: number = pattern.length;
  let textLength: number = text.length;

  let d: number[][] = [];
  let i: number;
  let j: number;

  if(pattern.length == 0 || text.length==0) {
    return text.length
  }else if(pattern[0]==text[0]){
    return levensthein(pattern.slice(1), text.slice(1))
  }else{
    return 1 + Math.min(levensthein(pattern, text.slice(1)), levensthein(pattern.slice(1), text), levensthein(pattern.slice(1), text.slice(1)))
  }

}