const db = require("../db/dbConfig.js");

const getAllSongs=async()=>{
    try {
        const allSongs=await db.any("Select * FROM songs ");
        return allSongs;
    } catch (error) {
      return error;
    }
}

const getOneSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};
const createSong=async(song)=>{
    try {
        const newSong=await db.one("INSERT INTO songs(name,artist,album,time,is_favorite)VALUES($1,$2,$3,$4,$5) RETURNING *",[song.name,song.artist,song.album,song.time,song.is_favorite]);
        return newSong;
    } catch (error) {
      return error;
    }
}
const destroySong=async(id)=>{
    try {
        const destroyedSong=await db.one("DELETE FROM songs WHERE id=$1 RETURNING *",id);
        return destroyedSong;
    } catch (error) {
      return error;
    }
}
const updateSong = async (id, song) => {
  const {
    name,artist,album,time,is_favorite
  } = song;

  try {
    const updateSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2,album=$3,time=$4,is_favorite=$5  WHERE id=$6 RETURNING *",
      [
        name,
        artist,
        album,
        time,
        is_favorite,
        id
        
     
      ]
    );
    return updateSong;
  } catch (error) {
    return error;
  }
};

// const updateSong=async(id)=>{
//     try {
//         const updateSong=await db.one("UPDATE songs SET RETURNING *",id);
//         return destroyedSong;
//     } catch (error) {
//       return error;
//     }
// }
module.exports={getAllSongs,getOneSong,createSong,destroySong,updateSong}

// (name,artist,album,time,is_favorite)VALUES($1,$2,$3,$4,$5)
// song.name,song.artist,song.album,song.time,song.is_favorite