var legislator = require('/server/api/lawmaker/lawmaker.model.js');




//function downloads and parses all legislator data from sunlight /legislators

//function  updates each with relevent info from influence explorer


//ftakes array of objects and saves them as legislators to db
function importLegislators(array){
  for (var i = 0; i < array.length; i++) {
    legislator.update(array[i].bioguide_id, array[i], {upsert: true}, function(err, numberAffected, rawResponse){  
      if (err) {console.log('Error importing legislators:', err, 'Legislator: ', rawResponse);}
      console.log('Legislator imported: ', rawResponse);
    });
  };
}