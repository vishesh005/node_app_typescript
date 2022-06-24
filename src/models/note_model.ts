export class Note {

    constructor(
        public readonly note_id: string,
        public readonly createdBy: string,
        public readonly title: string,
        public readonly content: string,
        public readonly created_at: string,
        public readonly modified_at: string,
    ) {
    }

    copyWith({
                 note_id = undefined,
                 createdBy = undefined,
                 title = undefined,
                 content = undefined,
                 created_at = undefined,
                 modified_at = undefined
             }): Note {
        return new Note(
            note_id == undefined ? this.note_id : note_id,
            createdBy == undefined ? this.createdBy : createdBy,
            title == undefined ? this.title : title,
            content == undefined ? this.content : content,
            created_at == undefined ? this.created_at : created_at,
            modified_at == undefined ? this.modified_at : modified_at
        );
    }

    static fromResponse(response: any): Note {
        if (response == undefined) return undefined;
        return new Note(
            response.note_id,
            response.createdBy,
            response.title,
            response.content,
            response.created_at,
            response.modified_at
        );
    }
}
