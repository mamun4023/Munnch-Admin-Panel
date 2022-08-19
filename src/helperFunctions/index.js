
export const CapitalizeFirstLetter = s =>{
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const CapitalizeAllLetter = s =>{
    if (typeof s !== 'string') return ''
    return s.toUpperCase();
}