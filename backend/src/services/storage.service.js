import ImageKit, { toFile } from "@imagekit/nodejs";

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile({ buffer, filename, folder = "" }) {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(buffer)),
    fileName: filename,
    folder: folder,
  });

  return file;
}

export default uploadFile;
