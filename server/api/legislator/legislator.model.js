'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LegislatorSchema = new Schema({
  //*****
  //From sunlight congress API
  //contains: Individual information
  //******
    //from /legistlators
  bioguide_id: String,
  birthday: Date,
  chamber: String,
  contact_form: String,
  crp_id: String,
  district: Number,
  facebook_id: String,
  fec_ids: [String],
  first_name: String,
  gender: String,
  govtrack_id: String,
  icpsr_id: String,
  in_office: Boolean,
  last_name: String,
  leadership_role: String,
  lis_id: String,
  middle_name: String,
  name_suffix: String,
  nickname: String,
  oc_email: String,
  ocd_id: String,
  office: String,
  party: String,
  phone: String,
  senate_class: Number,
  state: String,
  state_name: String,
  state_rank: String,
  term_end: Date,
  term_start: Date,
  thomas_id: String,
  title: String,
  twitter_id: String,
  votesmart_id: String,
  website: String,
  youtube_id: String,

    //from /bills
  sponsored_bills: [{bill_id:String, official_title: String, short_title: String, enacted: Boolean }],
  co_sponsored_bills: [{bill_id:String, official_title: String, short_title: String, enacted: Boolean }],

    //from /committees
  committee_membership: [{committee_name: String}],

  //********
  //From sunlight influence api
  //contains: funding information
  //********
  transparency_data_Id: String,
  top_Contributing_Industries: [{name: String, number_contributions:Number, total_amount:Number}],
  local_vs_outOfState_contributions: {inState: {number_contributions:Number, total_amount: Number}, outOfState: {number_contributions:Number, total_amount: Number}},
  contributor_type_comparison: {individuals: {number_contributions: Number, total_amount: Number}, PACs: {number_contributions: Number, total_amount: Number}}

  //*****
  //From GovTrak Api
  //contains: vote information
  //******
});

module.exports = mongoose.model('Legislator', LegislatorSchema);