export const roundNumToNumOfDecimals = (num, decimal) => parseFloat(Math.round(num * 100) / 100).toFixed(decimal);

//  shouldRound indicates wether the value needs to be cast to a 2 decimal float or not
export const setUpProductsFields = [
  {
    shouldRound: false,
    prop: 'name',
    field: 'Προϊόν'
  },
  {
    shouldRound: true,
    prop: 'buyPrice',
    field: 'Τιμή Αγοράς',
    number: true,
    numberStep: .001
  },
  {
    shouldRound: true,
    prop: 'sellPrice',
    field: 'Τιμή Πώλησης',
    number: true,
    numberStep: .001
  }
];

export const setUpOwersFields = [
  {
    field: 'Χρεώστης',
    prop: 'name',
    shouldRound: false
  }
];

//  autocomplete indicates that the field needs an autocomplete text field instead of a normal one
//  acDependant indicates that the field will be filled automatically based on the autocomplete field
export const tallyProductsFields = [
  {
    shouldRound: false,
    prop: 'name',
    field: 'Προϊόν',
    autocomplete: true,
    acDependant: false
  },
  {
    shouldRound: false,
    prop: 'amount',
    field: 'Ποσότητα',
    autocomplete: false,
    acDependant: false,
    number: true,
    numberStep: 1
  },
  {
    shouldRound: true,
    prop: 'sellPrice',
    field: 'Τιμή',
    autocomplete: false,
    acDependant: true,
    number: true,
    numberStep: .001
  },
  {
    shouldRound: true,
    prop: 'total',
    field: 'Σύνολο',
    autocomplete: false,
    acDependant: false,
    systemFilled: true,
    fillingFunc: item => item.sellPrice * item.amount
  }
];

export const tallyOwersFields = [
  {
    shouldRound: false,
    prop: 'name',
    field: 'Χρεώστης',
    autocomplete: true,
    acDependant: false
  },
  {
    shouldRound: true,
    prop: 'amount',
    field: 'Ποσό',
    autocomplete: false,
    acDependant: false,
    number: true,
    numberStep: .001
  }
]

export const tallyCashFields = [
  {
    shouldRound: false,
    prop: 'name',
    field: 'Μονάδα μέτρησης',
    autocomplete: true,
    acDependant: false
  },
  {
    shouldRound: true,
    prop: 'amount',
    field: 'Ποσό',
    autocomplete: false,
    acDependant: false,
    number: true,
    numberStep: .001
  }
];

export const cashMeasurementUnitSuggestions = [
  {name: 'Μετρητά'},
  {name: '2 ευρώ'},
  {name: '1 ευρώ'},
  {name: '50 σεντ'},
  {name: '20 σεντ'},
  {name: '10 σεντ'},
  {name: '5 σεντ'},
  {name: '2 σεντ'},
  {name: '1 σεντ'}
];