import { BlobServiceClient } from "@azure/storage-blob";

class BlobService {
  readonly #connStr: string;
  #serviceInstance: BlobServiceClient | null = null;

  constructor() {
    this.#connStr = process.env.AZURE_BLOB_CONNECTION_STRING || '';
    if (!this.#connStr) {
      throw new Error('Not found Azure Blob Connection String');
    }
  }

  getServiceInstance() {
    if (this.#serviceInstance) {
      return this.#serviceInstance;
    }
    this.#serviceInstance = BlobServiceClient.fromConnectionString(this.#connStr);
    return this.#serviceInstance;
  }
}

export const blobService = new BlobService();
