"use strict" ;

const resultSchema = require('../schemas/result_schema.js');

module.exports = class MongoDBResultSource {
  /* This result model is based on the QualityReportResult class found in
    https://github.com/projectcypress/quality-measure-engine/blob/master/lib/qme/quality_report.rb
    The model is designed to handle both Cat1 and Cat3 aggregate results
    */

  constructor(connectionInfo) {
    this.mongoose = require('mongoose');
    this.mongoose.connect(connectionInfo);

    this.resultMongo = this.mongoose.model('Result', resultSchema);

    this.embedded = {
      measure_id : '',
      sub_id : '',
      test_id : '',
      effective_date : 0,
      filters : {},
      prefilter = {},
      calculation_time : Date.now(),
      status : {"state": "unknown", "log": []},

      population_ids : {},
      STRAT : 0,
      IPP : 0,
      DENOM : 0,
      NUMER : 0,
      NUMEX : 0,
      DENEX : 0,
      DENEXCEP : 0,
      MSRPOPL : 0,
      OBSERV : 0.0,
      MSRPOPLEX : 0,
      supplemental_data : {}
    }
  }

  /* Given a patient and measure, perform a measure calculation and store the results in this
    object.
    */
  calculate(patient, measure, effective_date, correlation_id) {
    // Calculation logic
  }

  save() {
    let resultMongo = this.resultMongo(this.embedded);
    resultMongo.save(function (err) {
      if (err) return console.error(err);
    });
  }

}