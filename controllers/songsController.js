const express=require(`express`)

const {getAllSongs,getOneSong,createSong,destroySong}=require('../queries/song')
const songs=express.Router()
songs.get("/", async (req, res) => {
   
    const allSongs = await getAllSongs();
    if (allSongs[0]) {
        res.json(allSongs);
      } else {
        res.status(404).json({ error: "not found" });
      }
  });

songs.get("/:id", async (req, res) => {
    let id=req.params.id
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

module.exports=songs;