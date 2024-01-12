import mongoose from 'mongoose';
import moment from 'moment';

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: { type: Date, default: () => moment().format('DD/MM/YYYY') },
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;