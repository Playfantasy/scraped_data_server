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

const getAllPlayerPredictedPointsWithElementIdByGameweek = async ({
  elementIds,
  givenGW = null,
  range = false,
}) => {
  const myFinalGWNeeded =
    givenGW && givenGW.length > 0
      ? givenGW.map((elem) => parseInt(elem))
      : null;

  const my_query_data_exists = `SELECT * FROM ${
    db_models["combined_predicted_data_of_player"]
  } WHERE elementId IN (${elementIds.join(",")})`;

  console.log(my_query_data_exists);

  const [rows] = await mydb.query(my_query_data_exists);
  const elementIdsArr = rows?.map((row) => row.elementId);

  const not_exits = elementIds?.filter(
    (elemId) => !elementIdsArr.includes(elemId)
  );

  const existsResults = [];
  if (rows && rows.length > 0) {
    console.log("processing the rows");
    for (let i = 0; i < rows.length; i++) {
      const singlePlayer = rows[i];
      console.log("singlePlayer");
      console.log(singlePlayer["nameString"]);
      const { gameweeks, gameweeksByHub, ownership, nameString, ...rest } =
        singlePlayer;
      const finalPlayerGWObj = {};
      const finalPlayerGWObjByHub = {};
      const gameweekArr = gameweeks ? Object.entries(gameweeks) : [];
      if (!myFinalGWNeeded || myFinalGWNeeded == null) {
        if (gameweekArr.length > 0) {
          console.log("in if block else inner if");
          for (let j = 0; j < gameweekArr.length; j++) {
            const currentGw = gameweekArr[j][0];
            const currentPredictedPoint = gameweekArr[j][1];
            const tempPredictOptions = {
              gw: currentGw.replace("gw_", ""),
              points: null,
              opponent: null,
              home_away: null,
              color_code: null,
              minutes_played: null,
              predicted_points: currentPredictedPoint.toFixed(2),
            };
            const gameweekDataFromHubExits = Object.keys(gameweeksByHub).find(
              (elem) => (elem == currentGw ? gameweeksByHub[elem] : null)
            );
            if (gameweekDataFromHubExits != null) {
              finalPlayerGWObjByHub[currentGw] =
                gameweeksByHub[gameweekDataFromHubExits];
              const gameweekDataFromHub =
                gameweeksByHub[gameweekDataFromHubExits];
              tempPredictOptions["points"] = gameweekDataFromHub["points"];
              tempPredictOptions["opponent"] = gameweekDataFromHub["opponent"];
              tempPredictOptions["home_away"] =
                gameweekDataFromHub["home_away"];
              tempPredictOptions["color_code"] =
                gameweekDataFromHub["color_code"];
              tempPredictOptions["minutes_played"] =
                gameweekDataFromHub["minutes_played"];
            }
            finalPlayerGWObj[currentGw] = tempPredictOptions;
          }
        }
      } else {
        const gwRangeToInclude = [];
        if (range) {
          const initalGW = parseInt(myFinalGWNeeded[0]);
          const finalGW = parseInt(myFinalGWNeeded[myFinalGWNeeded.length - 1]);
          for (let iGW = initalGW; iGW <= finalGW; iGW++) {
            gwRangeToInclude.push(parseInt(iGW));
          }
        } else {
          myFinalGWNeeded.forEach((elem) =>
            gwRangeToInclude.push(parseInt(elem))
          );
        }
        console.log("in else block");
        const gameweekArr = gameweeks ? Object.entries(gameweeks) : [];
        console.log(gameweekArr.length);
        if (gameweekArr.length > 0) {
          console.log("in if block else inner if");
          for (let j = 0; j < gameweekArr.length; j++) {
            const currentGw = gameweekArr[j][0];
            if (
              gwRangeToInclude.includes(parseInt(currentGw.replace("gw_", "")))
            ) {
              const currentPredictedPoint = gameweekArr[j][1];
              const tempPredictOptions = {
                gw: currentGw.replace("gw_", ""),
                points: null,
                opponent: null,
                home_away: null,
                color_code: null,
                minutes_played: null,
                predicted_points: currentPredictedPoint.toFixed(2),
              };
              const gameweekDataFromHubExits = Object.keys(gameweeksByHub).find(
                (elem) => (elem == currentGw ? gameweeksByHub[elem] : null)
              );
              if (gameweekDataFromHubExits != null) {
                finalPlayerGWObjByHub[currentGw] =
                  gameweeksByHub[gameweekDataFromHubExits];
                const gameweekDataFromHub =
                  gameweeksByHub[gameweekDataFromHubExits];
                tempPredictOptions["points"] = gameweekDataFromHub["points"];
                tempPredictOptions["opponent"] =
                  gameweekDataFromHub["opponent"];
                tempPredictOptions["home_away"] =
                  gameweekDataFromHub["home_away"];
                tempPredictOptions["color_code"] =
                  gameweekDataFromHub["color_code"];
                tempPredictOptions["minutes_played"] =
                  gameweekDataFromHub["minutes_played"];
              }
              finalPlayerGWObj[currentGw.replace("gw_", "")] =
                tempPredictOptions;
            }
          }
        }
      }
      existsResults.push({
        ...rest,
        fullName: nameString.split(" ").slice(0, -2).join(" "),
        effectiveOwnership: ownership,
        gameweeks: finalPlayerGWObj,
        gameweeksByHub: finalPlayerGWObjByHub,
      });
    }
  }
  // console.log(rows);
  return {
    data: {
      exists: existsResults,
      not_exits: not_exits,
    },
  };
};

export const PlayerService = {
  getAllPlayerWithElementId,
  getAllPlayerPredictedPointsWithElementIdByGameweek,
};
