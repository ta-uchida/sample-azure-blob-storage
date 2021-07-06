class MyClass {
  readonly #msg: string;

  constructor() {
    this.#msg = 'Hello Node.js w/ TypeScript!';
  }

  output() {
    console.log(this.#msg);
  }
}

const myClass = new MyClass();
myClass.output();
