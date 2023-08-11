import path from "path"
import fs from 'fs'


export class TransferImage {
  private static instance: TransferImage;
  private id:string;
  private name:string;
  private type:string

  private constructor() {
    
  }

  static getInstance():TransferImage {
    if (!TransferImage.instance) {
      TransferImage.instance = new TransferImage();
    }
    return TransferImage.instance;
  }

  tempTOUploadFolder() {
    let PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'uploads')
    !fs.existsSync(PUBLIC_FOLDER_PATH) && fs.mkdirSync(PUBLIC_FOLDER_PATH)

    const TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'temp',this.type, this.name)

    const UPLOAD_FOLDERNAME_PATH = path.join(__dirname, '..', '..', 'public', 'uploads', this.id)
    !fs.existsSync(UPLOAD_FOLDERNAME_PATH) && fs.mkdirSync(UPLOAD_FOLDERNAME_PATH)

    const UPLOAD_FOLDER_PATH = path.join(__dirname, '..', '..', 'public', 'uploads', this.id, this.type)
    !fs.existsSync(UPLOAD_FOLDER_PATH) && fs.mkdirSync(UPLOAD_FOLDER_PATH)

    fs.renameSync(TEMP_FOLDER_PATH, path.join(UPLOAD_FOLDER_PATH, this.name)) 
    
  }

  setInfo(id: string,type:string,name:string): void {
    this.id =id
    this.name=name,
    this.type=type
  
  }
}

