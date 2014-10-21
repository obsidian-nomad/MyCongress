'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LawmakerSchema = new Schema({
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
  youtube_id: String
});

module.exports = mongoose.model('Lawmaker', LawmakerSchema);