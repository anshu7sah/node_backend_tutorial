export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// class Animal {
//   constructor(color) {
//     this.color = color;
//   }
// }

// class Dog extends Animal {
//   constructor(color, size) {
//     super(color);
//     this.size = size;
//   }
// }

// const a = new Dog("red", "M");

// console.log(a.color);
// console.log(a.size);

// throw new Error("kjsdvnkjsnkvjnd")
