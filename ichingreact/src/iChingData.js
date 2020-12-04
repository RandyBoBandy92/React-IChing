// So whats the hierarchy of data values?
// Lines
// Trigrams
// Hexagrams

export const iChingData = {
    lines: [
        {value: undefined, lineNum: 6, id: 6, image: '../images/nothing.png', name: undefined},
        {value: undefined, lineNum: 5, id: 5, image: '../images/nothing.png', name: undefined},
        {value: undefined, lineNum: 4, id: 4, image: '../images/nothing.png', name: undefined},
        {value: undefined, lineNum: 3, id: 3, image: '../images/nothing.png', name: undefined},
        {value: undefined, lineNum: 2, id: 2, image: '../images/nothing.png', name: undefined},
        {value: undefined, lineNum: 1, id: 1, image: '../images/nothing.png', name: undefined},
           ],
    imagePaths: {
        oldYin: '../images/old_yin.png',
        oldYang: '../images/old_yang.png',
        youngYin: '../images/young_yin.png',
        youngYang: '../images/young_yang.png',
        nothing: '../images/nothing.png'
    },
    trigrams: {
        upper: {
            value: undefined
        },
        lower: {
            value: undefined
        }
    }
}


export function getTrigram(lowerLineValue, middleLineValue, upperLineValue) {
    // so lets start with thunder
    if (upperLineValue === 'yin' && middleLineValue === 'yin' && lowerLineValue === 'yang') {
        return 'thunder'
    } else if (upperLineValue === 'yang' && middleLineValue === 'yang' && lowerLineValue === 'yin') {
        return 'wind'
    } else if (upperLineValue === 'yang' && middleLineValue === 'yin' && lowerLineValue === 'yang') {
        return 'fire'
    } else if (upperLineValue === 'yin' && middleLineValue === 'yin' && lowerLineValue === 'yin') {
        return 'earth'
    } else if (upperLineValue === 'yin' && middleLineValue === 'yang' && lowerLineValue === 'yang') {
        return 'lake'
    } else if (upperLineValue === 'yang' && middleLineValue === 'yang' && lowerLineValue ==='yang') {
        return 'heaven'
    } else if (upperLineValue === 'yin' && middleLineValue === 'yang' && lowerLineValue === 'yin') {
        return 'water'
    } else if (upperLineValue === 'yang' && middleLineValue === 'yin' && lowerLineValue === 'yin') {
        return 'mountain'
    }
}