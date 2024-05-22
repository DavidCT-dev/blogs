// modify the file attribits 
export const renameFile=(req,file,callback)=>{
  const [name,extension] = file.originalname.split('.');
  const fileName = file.originalname;
  const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random()*16).toString(16))
      .join('');
  callback(null,`${name}-${randomName}.${extension}`)
}

export const fileFilter = (req,file,callback) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)){
    return callback(new Error('invalid format type'),false)
  }
  callback(null,true)
}