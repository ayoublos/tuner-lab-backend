const express=require(`express`)

const {getAllSongs,getOneSong,createSong,destroySong,updateSong}=require('../queries/song')
const songs=express.Router()
songs.get("/", async (req, res) => {
   const order=req.query.order;
   const isFavorite=req.query.isFavorite;
    const allSongs = await getAllSongs();

    let ascSongs=[...allSongs].sort((a,b)=>{if(a.name<b.name)return -1
      if(a.name>b.name) return 1
      return 0
    })
    let desSongs=[...allSongs].sort((a,b)=>{if(a.name>b.name)return -1
      if(a.name<b.name) return 1
      return 0
    })
  
    if (allSongs[0]) {
       if(order===`asc`&&isFavorite===`true`){
        console.log('g')
        let filteredSongs=ascSongs.filter(el=>el.is_favorite=true)
        res.json(filteredSongs);
       }
       else if(order===`asc`&&isFavorite===`false`){
        let filteredSongs=ascSongs.filter(el=>el.is_favorite=false)

        res.json(filteredSongs);
       }
       else if(order===`asc`){
        res.json(ascSongs);
       }
       else if(order===`des`&&isFavorite===`true`){
        let filteredSongs=desSongs.filter(el=>el.is_favorite=true)
        res.json(filteredSongs);
       }
       else if(order===`des`&&isFavorite===false){
        let filteredSongs=desSongs.filter(el=>el.is_favorite=false)

        res.json(filteredSongs);
       }
       else if(order===`des`){
        res.json(desSongs);
       }
       else if(isFavorite===`true`){
        let filteredSongs=allSongs.filter(el=>el.is_favorite===true)
        res.json(filteredSongs);
       

       }
       else if(isFavorite===`false`){
        let filteredSongs=allSongs.filter(el=>el.is_favorite=false)

        res.json(filteredSongs);
       }
      
       
       
       else  res.json(allSongs);

        
      } else {
        res.status(404).json({ error: "not found" });
      }
  });

songs.get("/:id", async (req, res) => {
    let {id}=req.params
    const oneSong = await getOneSong(id);
    if (oneSong) {
        res.json(oneSong);
      } else {
        res.status(404).json({ error: "not found" });
      }
  });
songs.post("/", async (req, res) => {

    const newSong = await createSong(req.body);
   
        res.json(newSong);
      
  });

songs.delete("/:id", async (req, res) => {
    let id=req.params.id
   
    const deletedSong = await destroySong(id);
    res.send(deletedSong)
   
  });

songs.put("/:id", async (req, res) => {
  let id=req.params.id
 
  const updatedSong = await updateSong(id,req.body);
  res.status(200).json(updatedSong);

 
});
  

module.exports=songs;