import { blobService } from "../blobService";
import { BlobServiceClient } from "@azure/storage-blob";

export class GetContainerNames {
  readonly #service: BlobServiceClient

  constructor() {
    this.#service = blobService.getServiceInstance();
  }

  get() {
    return this.#service.listContainers();
  }
}
