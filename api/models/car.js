/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
      marka : {
          type: 'string', 
          required: true
      },
      boja : {
          type: 'string', 
          required: true
      },
      tezina: {
          type: 'integer'
      },
      brojMjesta: {
          type: 'integer',
          enum: ['2', '4', '5', '7']
      },
      kubikaza: {
          type: 'integer',
          required: true
      },
      datumTehnickog: {
          type: 'date'
      },
      kilometraza: {
          type: 'integer',
          required: true
      },
      transmisija: {
          type: 'string',
          enum: ['automatik', 'manuelni', 'poluautomatik']
      },
      vrstaMotora: {
          type: 'string',
          enum: ['benzin', 'dizel', 'hibridni', 'elektricni']
      }
  }
};
