const configs = {
    topType: [
      'NoHair',
      'Hat',
      'Hijab',
      'Turban',
      'WinterHat1',
      'WinterHat2',
      'WinterHat3',
      'WinterHat4',
      'LongHairBigHair',
      'LongHairBob',
      'LongHairCurly',
      'LongHairCurvy',
      'LongHairDreads',
      'LongHairFrida',
      'LongHairFro',
      'LongHairNotTooLong',
      'ShortHairDreads01',
      'ShortHairDreads02'
    ],
    accessoriesType: [
      'Blank',
      'Prescription01',
      'Prescription02',
      'Round',
      'Sunglasses',
    ],
    hatColor: [
      'Black',
      'Blue01',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
      'White'
    ],
    hairColor: [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
      'Platinum',
      'SilverGray'
    ],
    facialHairType: [
      'Blank',
      'BeardLight',
    ],
    facialHairColor: [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
    ],
    clotheType: [
      'BlazerShirt',
      'BlazerSweater',
      'CollarSweater',
      'GraphicShirt',
      'Hoodie',
      'Overall',
      'ShirtCrewNeck',
      'ShirtScoopNeck',
      'ShirtVNeck'
    ],
    clotheColor: [
      'Black',
      'Blue01',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
      'White'
    ],
    graphicType: [
      'Bat',
      'Cumbia',
      'Deer',
      'Diamond',
    ],
    eyeType: [
      'Close',
      'Cry',
      'Default',
      'Dizzy',
      'EyeRoll',
      'Happy',
      'Hearts',
      'Side',
      'Squint',
      'Surprised',
      'Wink',
      'WinkWacky'
    ],
    eyebrowType: [
      'Angry',
      'AngryNatural',
      'Default',
      'DefaultNatural',
      'FlatNatural',
      'RaisedExcited',
      'RaisedExcitedNatural',
      'SadConcerned',
      'SadConcernedNatural',
      'UnibrowNatural',
      'UpDown',
      'UpDownNatural'
    ],
    mouthType: [
      'Concerned',
      'Default',
      'Disbelief',
      'Eating',
      'Grimace',
      'Sad',
      'ScreamOpen',
      'Serious',
      'Smile',
      'Tongue',
      'Twinkle',
      'Vomit'
    ],
    skinColor: [
      'Tanned',
      'Yellow',
      'Light',
      'Brown',
      'DarkBrown',
      'Black'
    ]
  }
  
  const configsKeys = Object.keys(configs);
  
  export function generateRandomAvatarOptions() {
    const options = { }
    const keys = [...configsKeys]
    if(keys){
      keys.forEach(key => {
        const configArray = configs[key];
        options[key] = configArray[Math.floor(Math.random()*configArray.length)];
      })
    }
  
    return options;
  }