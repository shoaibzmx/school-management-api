const db= require("../db");

const haversine=(lat1,lon1,lat2,lon2)=>{
    const R=6371;
    const dLat =((lat2-lat1)*Math.PI)/180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};


exports.addSchool =async(req,res)=>{
  const {name,address,latitude,longitude}=req.body;
  if(!name|| !address||isNaN(latitude)|| isNaN(longitude)){
    return res.status(400).json({error:'Invalid input data'});
  }
  try {
    const[result]= await db.execute(
        'INSERT INTO schools(name,address,latitude,longitude) values(?,?,?,?)',
        [name,address,latitude,longitude]);

        res.status(201).json({message:'School added successfully',id:result.inserted});
  } catch (error) {
      res.status(500).json({error:'Database error',details:error});
  }
};




exports.listSchools =async(req,res)=>{
     const {latitude,longitude}= req.query;
        if(isNaN(latitude)||isNaN(longitude)){
            return res.status(400).json({error:'Invalid coordinates'})}
    try {
         const [schools]=await db.query('SELECT *FROM schools');
         const sorted = schools.map((school)=>({...school,distance:haversine(latitude,longitude,school.latitude,school.longitude)
       })).sort((a,b)=>a.distance-b.distance);
       res.json(sorted);
        }
     catch (error) {
         res.status(500).json({ error:'Database error',detail:error});
    };
}