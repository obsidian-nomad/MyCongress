/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Legislator = require('../api/legislator/legislator.model');
//var User = require('../api/user/user.model');

Legislator.find({}).remove(function() {
  Legislator.create({
    //*****
    //From sunlight congress API
    //contains: Individual information
    //******
      //from /legistlators
    "bioguide_id": "P000197",
    "birthday": "1940-03-26",
    "chamber": "house",
    "contact_form": "http://pelosi.house.gov/contact-me/email-me",
    "crp_id": "N00007360",
    "district": 12,
    "facebook_id": "86574174383",
    "fec_ids": [
        "H8CA05035"
    ],
    "first_name": "Nancy",
    "gender": "F",
    "govtrack_id": "400314",
    "icpsr_id": 15448,
    "in_office": true,
    "last_name": "Pelosi",
    "leadership_role": "Minority Leader",
    "middle_name": null,
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Rep.Pelosi@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:ca/cd:12",
    "office": "235 Cannon House Office Building",
    "party": "D",
    "phone": "202-225-4965",
    "state": "CA",
    "state_name": "California",
    "term_end": "2015-01-03",
    "term_start": "2013-01-03",
    "thomas_id": "00905",
    "title": "Rep",
    "twitter_id": "NancyPelosi",
    "votesmart_id": 26732,
    "website": "http://pelosi.house.gov",
    "youtube_id": "nancypelosi",

      //from /committees
    "committee_membership": [{"committee_name": null}],

    //********
    //From sunlight influence api
    //contains: funding information
    //********
    "transparency_data_Id": "85ab2e74589a414495d18cc7a9233981",
    
    "top_Contributing_Industries": [
        {
            "number_contributions": 92,
            "total_amount": 253700.00,
            "name": "HEALTH PROFESSIONALS"
        },
        {
            "number_contributions": 117,
            "total_amount": 203600.00,
            "name": "LAWYERS/LAW FIRMS"
        },
        {
            "number_contributions": 108,
            "total_amount": 125350.00,
            "name": "LOBBYISTS"
        },
        {
            "number_contributions": 45,
            "total_amount": 109200.00,
            "name": "SECURITIES & INVESTMENT"
        },
        {
            "number_contributions": 101,
            "total_amount": 107150.00,
            "name": "RETIRED"
        },
        {
            "number_contributions": 58,
            "total_amount": 105800.00,
            "name": "REAL ESTATE"
        },
        {
            "number_contributions": 72,
            "total_amount": 89700.00,
            "name": "PRO-ISRAEL"
        },
        {
            "number_contributions": 39,
            "total_amount": 86300.00,
            "name": "PHARMACEUTICALS/HEALTH PRODUCTS"
        },
        {
            "number_contributions": 29,
            "total_amount": 79500.00,
            "name": "PUBLIC SECTOR UNIONS"
        },
        {
            "number_contributions": 32,
            "total_amount": 76950.00,
            "name": "TV/MOVIES/MUSIC"
        }
    ],
    
    "local_vs_outOfState_contributions": {"inState": {"number_contributions":4567, "total_amount": 5063828.00}, 
                                        "outOfState": {"number_contributions":2206, "total_amount": 2326050.00}
                                    },
    
    "contributor_type_comparison": {"individuals": {"number_contributions": 740, "total_amount": 1147843.00}, 
                                  "PACs": {"number_contributions": 386, "total_amount": 1031500.00}
                                    }


  },  {
    "bioguide_id": "U000039",
    "birthday": "1948-05-18",
    "chamber": "senate",
    "contact_form": "http://www.tomudall.senate.gov/?p=contact",
    "crp_id": "N00006561",
    "district": null,
    "facebook_id": "106433512869",
    "fec_ids": [
        "H8NM03097",
        "S8NM00184"
    ],
    "first_name": "Tom",
    "gender": "M",
    "govtrack_id": "400413",
    "icpsr_id": 29924,
    "in_office": true,
    "last_name": "Udall",
    "lis_id": "S326",
    "middle_name": "S.",
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Sen.Tomudall@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:nm",
    "office": "110 Hart Senate Office Building",
    "party": "D",
    "phone": "202-224-6621",
    "senate_class": 2,
    "state": "NM",
    "state_name": "New Mexico",
    "state_rank": "senior",
    "term_end": "2015-01-03",
    "term_start": "2009-01-06",
    "thomas_id": "01567",
    "title": "Sen",
    "twitter_id": "SenatorTomUdall",
    "votesmart_id": 22658,
    "website": "http://www.tomudall.senate.gov",
    "youtube_id": "senatortomudall"
  },  {
    "bioguide_id": "M000355",
    "birthday": "1942-02-20",
    "chamber": "senate",
    "contact_form": "http://www.mcconnell.senate.gov/public/index.cfm?p=ContactForm",
    "crp_id": "N00003389",
    "district": null,
    "facebook_id": "mitchmcconnell",
    "fec_ids": [
        "S2KY00012"
    ],
    "first_name": "Mitch",
    "gender": "M",
    "govtrack_id": "300072",
    "icpsr_id": 14921,
    "in_office": true,
    "last_name": "McConnell",
    "leadership_role": "Minority Leader",
    "lis_id": "S174",
    "middle_name": null,
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Sen.Mcconnell@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:ky",
    "office": "317 Russell Senate Office Building",
    "party": "R",
    "phone": "202-224-2541",
    "senate_class": 2,
    "state": "KY",
    "state_name": "Kentucky",
    "state_rank": "senior",
    "term_end": "2015-01-03",
    "term_start": "2009-01-06",
    "thomas_id": "01395",
    "title": "Sen",
    "twitter_id": "McConnellPress",
    "votesmart_id": 53298,
    "website": "http://www.mcconnell.senate.gov",
    "youtube_id": null
  },  {
    "bioguide_id": "M000303",
    "birthday": "1936-08-29",
    "chamber": "senate",
    "contact_form": "http://www.mccain.senate.gov/public/index.cfm/contact-form",
    "crp_id": "N00006424",
    "district": null,
    "facebook_id": "6425923706",
    "fec_ids": [
        "S6AZ00019",
        "P80002801"
    ],
    "first_name": "John",
    "gender": "M",
    "govtrack_id": "300071",
    "icpsr_id": 15039,
    "in_office": true,
    "last_name": "McCain",
    "lis_id": "S197",
    "middle_name": "S.",
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Sen.Mccain@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:az",
    "office": "241 Russell Senate Office Building",
    "party": "R",
    "phone": "202-224-2235",
    "senate_class": 3,
    "state": "AZ",
    "state_name": "Arizona",
    "state_rank": "senior",
    "term_end": "2017-01-03",
    "term_start": "2011-01-05",
    "thomas_id": "00754",
    "title": "Sen",
    "twitter_id": "SenJohnMcCain",
    "votesmart_id": 53270,
    "website": "http://www.mccain.senate.gov",
    "youtube_id": "SenatorJohnMcCain"
  },  {
    "bioguide_id": "M001165",
    "birthday": "1965-01-26",
    "chamber": "house",
    "contact_form": "https://kevinmccarthy.house.gov/contact/email-me",
    "crp_id": "N00028152",
    "district": 23,
    "facebook_id": "51052893175",
    "fec_ids": [
        "H6CA22125",
        "H2CA23148"
    ],
    "first_name": "Kevin",
    "gender": "M",
    "govtrack_id": "412190",
    "icpsr_id": 20703,
    "in_office": true,
    "last_name": "McCarthy",
    "leadership_role": "Majority Leader",
    "middle_name": null,
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Rep.Kevinmccarthy@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:ca/cd:23",
    "office": "2421 Rayburn House Office Building",
    "party": "R",
    "phone": "202-225-2915",
    "state": "CA",
    "state_name": "California",
    "term_end": "2015-01-03",
    "term_start": "2013-01-03",
    "thomas_id": "01833",
    "title": "Rep",
    "twitter_id": "GOPWhip",
    "votesmart_id": 28918,
    "website": "http://kevinmccarthy.house.gov",
    "youtube_id": "repkevinmccarthy"
  },  {
    "bioguide_id": "R000146",
    "birthday": "1939-12-02",
    "chamber": "senate",
    "contact_form": "http://www.reid.senate.gov/contact",
    "crp_id": "N00009922",
    "district": null,
    "facebook_id": "360249323990357",
    "fec_ids": [
        "S6NV00028"
    ],
    "first_name": "Harry",
    "gender": "M",
    "govtrack_id": "300082",
    "icpsr_id": 15054,
    "in_office": true,
    "last_name": "Reid",
    "leadership_role": "Majority Leader",
    "lis_id": "S198",
    "middle_name": "M.",
    "name_suffix": null,
    "nickname": null,
    "oc_email": "Sen.Reid@opencongress.org",
    "ocd_id": "ocd-division/country:us/state:nv",
    "office": "522 Hart Senate Office Building",
    "party": "D",
    "phone": "202-224-3542",
    "senate_class": 3,
    "state": "NV",
    "state_name": "Nevada",
    "state_rank": "senior",
    "term_end": "2017-01-03",
    "term_start": "2011-01-05",
    "thomas_id": "00952",
    "title": "Sen",
    "twitter_id": "SenatorReid",
    "votesmart_id": 53320,
    "website": "http://www.reid.senate.gov",
    "youtube_id": "SenatorReid"
  });
});

//Not seeding user data yet.
//
// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });