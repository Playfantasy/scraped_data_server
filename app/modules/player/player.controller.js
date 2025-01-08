import catchAsync from "../../shared/catchAsync.js";
import sendResponse from "../../shared/sendResponse.js";
import httpStatus from "http-status";
import { PlayerService } from "./player.service.js";

const getAllPlayerWithElementId = catchAsync(async (req, res) => {
  console.log(`in getAllPlayer`);
  const playerList = req?.body?.players;
  if (!playerList || (playerList && playerList.length <= 0)) {
    return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "No data provided to fetch",
      data: [],
    });
  }
  const result = await PlayerService.getAllPlayerWithElementId(playerList);
  return sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Player fetched successfully",
    data: result.data,
  });
});

export const PlayerController = {
  getAllPlayerWithElementId,
};
