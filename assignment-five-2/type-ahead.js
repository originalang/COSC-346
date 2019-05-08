class TypeAhead {
    constructor(data) {
        this.data = data;        
    }

    findMatches(wordToMatch, keyList) {
        if (this.data.length === 0) return
        return this.data.filter(dataPoint => {
            const regex = new RegExp(wordToMatch, 'gi');

            for (let key of keyList) {
                let match = dataPoint[key].match(regex)
                if (match) {
                    return match;
                }
            }
        });
    }
}