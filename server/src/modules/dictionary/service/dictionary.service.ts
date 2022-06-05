import CreateWordDto from '../dto/create-word.dto';
import { DictionaryModel } from '../model/dictionary.model';


export class DictionaryService {

    async getWords() {
        return await DictionaryModel.find();
    }

    async addWord ({ word, translation, transcription, usageExamples}: CreateWordDto){

        const existedWord = await DictionaryModel.findOne({ word })

        // Check for existence.
        if(existedWord) {
            return null;
        }

        const newWord = new DictionaryModel({ word, translation, transcription, usageExamples });
        
        await newWord.save();
    
        return newWord;
    }

    async deleteWord (id: string){

        // Check for existence.
        const existedWord = await DictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const deletedWord = await DictionaryModel.findByIdAndDelete(id).exec();
        return  deletedWord;
    }

    async modifyWord (id: string, dto: CreateWordDto){

        // Check for existence.
        const existedWord = await DictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const modifiedWord = await DictionaryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return  modifiedWord;
    }
}

export default new DictionaryService();