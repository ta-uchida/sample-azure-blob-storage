import dotenv from 'dotenv';
dotenv.config();

import { GetContainerNames } from "./sample/getContainerNames";

(async function main() {
  let i = 1;
  let containers = new GetContainerNames().get();
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
  }
})();
