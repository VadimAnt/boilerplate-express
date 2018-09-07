// const Transport = require('winston-transport');
// const DBService = require('@services');


// module.exports = class MongoTransport extends Transport {
//   constructor(opts) {
//     super(opts);
//     this.logTable = DBService.models('Table');
//   }
//
//   async log(level, message, meta = {}) {
//     try {
//
//       return this.logTable.create({
//         message,
//         meta,
//         level,
//       });
//
//     } catch (error) {
//       throw error;
//     }
//   }
// };
