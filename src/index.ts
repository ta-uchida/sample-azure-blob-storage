import dotenv from 'dotenv';
dotenv.config();

import { GetContainerNames } from "./sample/getContainerNames";
import { OperateBlob } from "./sample/operateBlob";

(async function main() {
  // let i = 1;
  // let containers = new GetContainerNames().get();
  // for await (const container of containers) {
  //   console.log(`Container ${i++}: ${container.name}`);
  // }

  const operateBlob = new OperateBlob();
  const uploadedFileName = await operateBlob.upload();
  await operateBlob.download(uploadedFileName);
})().catch(console.error);
