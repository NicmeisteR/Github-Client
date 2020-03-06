import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }
}

export function fixName(name) {
  if (name.includes("-")) {
      return name.split('-').join(' ');
  }
  else if (name.includes("_")) {
      return name.split('_').join(' ');
  }
  else {
      return titleCase(name);
  }
}

export function titleCase(string) {
  let sentence = string.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

export function setColors(projectLanguages) {
  let colors = [];
  
  projectLanguages.forEach(item => {
      
      if (item.name === "JavaScript") {
          colors.push("#f0Db47")
      }
      else if (item.name === "TypeScript") {
          colors.push("#007acc")
      }
      else if (item.name === "HTML") {
          colors.push("#f16529")
      }
      else if (item.name === "CSS") {
          colors.push("CFC0BB")
      }
      else if (item.name === "Batchfile") {
          colors.push("CFC0BB")
      }
      else if (item.name === "Csharp") {
          colors.push("CFC0BB")
      }
  });

  return colors;
}