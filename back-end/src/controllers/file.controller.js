
const File = require('../models/file.model');
const { PDFDocument } = require('pdf-lib');
const { extractRawText } = require('mammoth');
const { Document, Paragraph, Packer } = require('docx');

const getPdfPage = async (buffer) => {
  const pdfDoc = await PDFDocument.load(buffer);
  const pageCount = await pdfDoc.getPageCount();
  return pageCount;
}

const getDocxPage = async(buffer) => {
  const { value: text } = await extractRawText({ buffer });
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount/300);
}


// [POST] /api/file/upload
const upload = async (req, res, next) => {
  try {
    if(!req.files || req.files.length === 0){
      return res.json({ error : 'No files were uploaded!'});
    }

    const client_id = req.role;
    let fileRecords = [];

    const uploadPromise = req.files.map(async (file) => {
      const { originalname, mimetype, buffer } = file;
      let pageNumber = null;

      if(mimetype === 'application/pdf'){
        pageNumber = await getPdfPage(buffer);
      } else if(['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(mimetype)) {
        pageNumber = await getDocxPage(buffer);
      }

      const fileRecord = new File({
        originalname,
        mimetype,
        buffer,
        pageNumber,
        client_id
      });
      fileRecords.push(fileRecord);
      await fileRecord.save();
      return true;
    });
    await Promise.all(uploadPromise);
    res.json({ 
      message: 'Files uploaded successfully!' ,
      data: fileRecords
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const files = await File.find();
    if(!files || files.length === 0){
      return res.json({ message: 'There are currently no files available.'})
    }
    res.status(200).json({
      message: 'Get all files successfully!!!',
      data: files
    });
    
  } catch(err) {
    console.log(err);
    next(err);
  }
};

const getAllById = async (req, res, next) => {
  try {
    const files = await File.find({client_id: req.role, isTransaction: false});
    if( !files || files.length === 0 ){
      return res.json({ message: 'No files found.' });
    }

    res.status(200).json(files);
  } catch(err) {
    console.log(err);
    next(err);
  }
}

//[GET] /api/file/:id
const getById = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if(!file) {
      return res.json({ message: 'File not found.' });
    }
    
    const safeFilename = encodeURIComponent(file.originalname.trim());

    if(file.mimetype === 'application/pdf') {
      res.setHeader('Content-Type', file.mimetype);
      res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
      res.setHeader('Content-Length', file.buffer.length);
      res.status(200).send(file.buffer);
    } else if(['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.mimetype)) {
      res.setHeader('Content-Type', file.mimetype);
      res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
      res.status(200).send(file.buffer);
    }
  } catch(err) {
    console.log(err);
    next(err);
  }
};

const getByIdInfor = async (req, res, next) => {
  try {
    const file = await File.findById({_id: req.params.id});
    if(!file) {
      return res.status(404).json({ message: 'File not found.' });
    }
    res.status(200).json(file);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

const getReviewPdfPage = async (buffer) => {
  const pdfDoc = await PDFDocument.load(buffer);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdfDoc, [0, 1, 2]);
    
  pages.map((page) => newPdf.addPage(page));
  return Buffer.from(await newPdf.save());
}

const getReviewDocPage = async (buffer) => {
  const {value: text} = await extractRawText({buffer});
  const paragraphs = text.split('\n').filter((line) => line.trim() !== '');
  const Pages = paragraphs.slice(0,50);

  const doc = new Document({
    sections: [
      {
        children: Pages.map(
          (line) => new Paragraph({ text: line })
        ),
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

// [GET] /api/file/:id/review/
const review = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);
    if(!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    
    const safeFilename = encodeURIComponent(file.originalname.trim());
    if(file.mimetype === 'application/pdf') {
      const pdfBuffer = await getReviewPdfPage(file.buffer);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
      res.setHeader('Content-Length', pdfBuffer.length);
  
      res.send(pdfBuffer);
    } else if(['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.mimetype)){
      const docBuffer = await getReviewDocPage(file.buffer);
      
      res.setHeader('Content-Type', file.mimetype);
      res.setHeader('Content-Disposition', `inline; filename="${safeFilename}"`);
      res.status(200).send(docBuffer);
    }

  } catch(err) {
    console.log(err);
    next(err);
  }
};

// [DELETE] /api/file/:id/delete
const remove = async (req, res, next) => {
  try {
    const deleteFile = await File.deleteOne({_id: req.params.id, isTransaction: false});
    
    const check = await File.findById(deleteFile._id);
    if(!check){
      return res.status(200).json({ message: 'File deleted successfully.' });
    }
    res.status(400).json({ message: 'Failed to delete file.' }); 
  } catch(err) {
    console.log(err);    
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const file = await File.findById(req.body.id);
    if(!file) {
      return res.status(404).json({ message: 'File not found.' });
    }

    file.buffer = null;
    file.isTransaction = true;
    await file.save();
    res.status(200).json({ message: 'Update file successfully!!!', data: file });
  } catch (err) {
    console.log(err);
    next(err);
  }
}


module.exports = { upload , getAll, getAllById, getById, getByIdInfor, review, remove, update };

