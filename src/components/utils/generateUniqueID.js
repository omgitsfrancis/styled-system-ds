export const UniqueId = () => {
    
    const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz'];
    const allUniqueChars = [...'~!@#$%^&*()_+-=[]{}|;:\'",./<>?'];
    const allNumbers = [...'0123456789'];
    const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];
  
    const generateID = (base, len) => {
      const ranString = [...Array(len)].map(i => base[(Math.random() * base.length) | 0]).join(''); // eslint-disable-line no-unused-vars
      return ("id" + ranString)
    };
    
  return generateID(base, 5)
};