// So whats the hierarchy of data values?
// Lines
// Trigrams
// Hexagrams

export const iChingData = {
    lines: [
        {value: undefined, transformValue: undefined, lineNum: 6, id: 6, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
        {value: undefined, transformValue: undefined, lineNum: 5, id: 5, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
        {value: undefined, transformValue: undefined, lineNum: 4, id: 4, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
        {value: undefined, transformValue: undefined, lineNum: 3, id: 3, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
        {value: undefined, transformValue: undefined, lineNum: 2, id: 2, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
        {value: undefined, transformValue: undefined, lineNum: 1, id: 1, image: process.env.PUBLIC_URL + '/images/nothing.png', transformImage: process.env.PUBLIC_URL + '/images/nothing.png', name: undefined, transformName: undefined},
           ],
    imagePaths: {
        oldYin: process.env.PUBLIC_URL + '/images/old_yin.png',
        oldYang: process.env.PUBLIC_URL + '/images/old_yang.png',
        youngYin: process.env.PUBLIC_URL + '/images/young_yin.png',
        youngYang: process.env.PUBLIC_URL + '/images/young_yang.png',
        nothing: process.env.PUBLIC_URL + '/images/nothing.png'
    },
    trigrams: {
        upper: {
            value: undefined
        },
        lower: {
            value: undefined
        },
        transformedUpper: {
            value: undefined
        },
        transformedLower: {
            value: undefined
        }
    },
    hexagram: {
        number: undefined,
        transformNumber: undefined
    },
    hexagramText: {
        primaryHexagramText: undefined,
        transformedHexagramText: undefined
    },
    textStyles: {
        primaryHexText: {
          display: "block"
        },
        transformedHexText: {
          display: "none"
        }
    }
}


export function getTrigram(lowerLineName, middleLineName, upperLineName) {
    // so lets start with thunder
    if (upperLineName === 'yin' && middleLineName === 'yin' && lowerLineName === 'yang') {
        return 'thunder'
    } else if (upperLineName === 'yang' && middleLineName === 'yang' && lowerLineName === 'yin') {
        return 'wind'
    } else if (upperLineName === 'yang' && middleLineName === 'yin' && lowerLineName === 'yang') {
        return 'fire'
    } else if (upperLineName === 'yin' && middleLineName === 'yin' && lowerLineName === 'yin') {
        return 'earth'
    } else if (upperLineName === 'yin' && middleLineName === 'yang' && lowerLineName === 'yang') {
        return 'lake'
    } else if (upperLineName === 'yang' && middleLineName === 'yang' && lowerLineName ==='yang') {
        return 'heaven'
    } else if (upperLineName === 'yin' && middleLineName === 'yang' && lowerLineName === 'yin') {
        return 'water'
    } else if (upperLineName === 'yang' && middleLineName === 'yin' && lowerLineName === 'yin') {
        return 'mountain'
    }
}

export function getHexagramNumber(lowerTrigram, upperTrigram) {
    // console.log('get hex number function running')
    let hexagramNumbers = {
        // starting with all hexagrams that have lower trigram of thunder
        'heaven': {
            // upper trigrams go here
            'heaven': 1,
            'thunder': 34,
            'water': 5,
            'mountain': 26,
            'earth': 11,
            'wind': 9,
            'fire': 14,
            'lake': 43
        },
        'thunder': {
            // upper trigrams go here
            'heaven': 25,
            'thunder': 51,
            'water': 3,
            'mountain': 27,
            'earth': 24,
            'wind': 42,
            'fire': 21,
            'lake': 17
        },
        'water': {
            // upper trigrams go here
            'heaven': 6,
            'thunder': 40,
            'water': 29,
            'mountain': 4,
            'earth': 7,
            'wind': 59,
            'fire': 64,
            'lake': 47
        },
        'mountain': {
            // upper trigrams go here
            'heaven': 33,
            'thunder': 62,
            'water': 39,
            'mountain': 52,
            'earth': 15,
            'wind': 53,
            'fire': 56,
            'lake': 31
        },
        'earth': {
            // upper trigrams go here
            'heaven': 12,
            'thunder': 16,
            'water': 8,
            'mountain': 23,
            'earth': 2,
            'wind': 20,
            'fire': 35,
            'lake': 45
        },
        'wind': {
            // upper trigrams go here
            'heaven': 44,
            'thunder': 32,
            'water': 48,
            'mountain': 18,
            'earth': 46,
            'wind': 57,
            'fire': 50,
            'lake': 28
        },
        'fire': {
            // upper trigrams go here
            'heaven': 13,
            'thunder': 55,
            'water': 63,
            'mountain': 22,
            'earth': 36,
            'wind': 37,
            'fire': 30,
            'lake': 49
        },
        'lake': {
            // upper trigrams go here
            'heaven': 10,
            'thunder': 54,
            'water': 60,
            'mountain': 41,
            'earth': 19,
            'wind': 61,
            'fire': 38,
            'lake': 58
        },

    }
    // console.log(hexagramNumbers[lowerTrigram][upperTrigram])
    return hexagramNumbers[lowerTrigram][upperTrigram]
}

export function getTransformValue(value) {
    if (value === 6) {
        return 7
    } else if (value === 9) {
        return 8
    } else {
        return value
    }
}

export function getHexagramText(hexagramNumber) {
    let hexagramText = require(`./DekorneText/hexagramJSONS/hexagram${hexagramNumber}.json`)
    // console.log(`hexagram text is ${hexagramText}`)
    return hexagramText
}