const like = [
  "66204159aeb3fc734144d859",
  "66200f6cf6324b50070e9a6c",
  "66200f6cf6324b50070e9a64",
  "66200f6cf6324b50070e9a62",
  "66200f6cf6324b50070e9a62",
];

const userId = "66200f6cf6324b50070e9a6c";

const index = like.indexOf(userId);
if (index !== -1) {
  like.splice(index, 1);
}

console.log(like); // Output: ["66204159aeb3fc734144d859"]