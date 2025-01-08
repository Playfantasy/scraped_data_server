import mydb from "../../../config/db.js";
import { db_models } from "../../../config/db_models.js";

const getAllPlayerWithElementId = async (elementIds) => {
  console.log(`in player service`);
  const my_query_data_exists = `SELECT * FROM ${
    db_models["combined_predicted_data_of_player"]
  } WHERE elementId IN (${elementIds.join(",")})`;
  console.log(my_query_data_exists);
  const [rows] = await mydb.query(my_query_data_exists);
  const elementIdsArr = rows?.map((row) => row.elementId);

  const not_exits = elementIds?.filter(
    (elemId) => !elementIdsArr.includes(elemId)
  );
  // console.log(rows);
  return {
    data: {
      exists: rows,
      not_exits: not_exits,
    },
  };
};

export const PlayerService = {
  getAllPlayerWithElementId,
};
