import path from "path"
import fs from 'fs'
export function transferImageFromTempTOUploadFolder(id: string,type:string,name:string) {
    let PUBLIC_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'uploads')
    !fs.existsSync(PUBLIC_FOLDER_PATH) && fs.mkdirSync(PUBLIC_FOLDER_PATH)

    const TEMP_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'temp', type, name)

    const UPLOAD_FOLDERNAME_PATH = path.join(__dirname, '..', '..', '..', 'public', 'uploads', id)
    !fs.existsSync(UPLOAD_FOLDERNAME_PATH) && fs.mkdirSync(UPLOAD_FOLDERNAME_PATH)

    const UPLOAD_FOLDER_PATH = path.join(__dirname, '..', '..', '..', 'public', 'uploads', id, type)
    !fs.existsSync(UPLOAD_FOLDER_PATH) && fs.mkdirSync(UPLOAD_FOLDER_PATH)

    fs.renameSync(TEMP_FOLDER_PATH, path.join(UPLOAD_FOLDER_PATH, name))
  }