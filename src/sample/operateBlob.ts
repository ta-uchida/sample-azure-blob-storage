import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { blobService } from "../blobService";

export class OperateBlob {
  readonly #service: BlobServiceClient;
  readonly #containerName: string;
  readonly #containerClient: ContainerClient;

  constructor() {
    this.#containerName = process.env.AZURE_BLOB_CONTAINER_NAME || '';
    if (!this.#containerName) {
      throw new Error('Not found Azure Blob target container name');
    }
    this.#service = blobService.getServiceInstance();
    this.#containerClient = this.#service.getContainerClient(this.#containerName);
  }

  async upload(): Promise<string> {
    const content = "Hello world!";
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = this.#containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    // e.g. Upload block blob newblob1625586283552 successfully e7a8282b-401e-0181-1b7d-72d2d4000000
    return Promise.resolve(blobName);
  }

  async download(blobName: string) {
    const blobClient = this.#containerClient.getBlobClient(blobName);

    // Get blob content from position 0 to the end
    // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
    const downloadBlockBlobResponse = await blobClient.download();
    const buffer = await this.#streamToBuffer(downloadBlockBlobResponse.readableStreamBody);
    const downloaded = buffer.toString();
    console.log("Downloaded blob content:", downloaded);
  }

  // [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
  async #streamToBuffer(readableStream: NodeJS.ReadableStream | undefined): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      readableStream?.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream?.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream?.on("error", reject);
    });
  }
}
