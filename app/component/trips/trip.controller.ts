class TripController {
    // public getTrip = async (request: Request, response: Response) => {
    //   const trip = await TripService.findOne({ _id: request.params.tripId });
    //   return ResponseHandler.SuccessResponse(
    //     response,
    //     StatusCodes.OK,
    //     'fetched trip',
    //     { trip },
    //   );
    // };
    // public dailyCheckIn = async (request: Request, response: Response) => {
    //   const existingTrip = await TripService.findOne({
    //     rider: request.user.id,
    //     checkOutTime: null,
    //     checkInType: 'daily',
    //   });
    //   if (existingTrip) throw new ClientError('Employee already checked in for the day.')
    //   return  TripService.create({
    //     rider: request.user.id,
    //     checkInTime: new Date(),
    //     checkInType: 'Daily',
    //   });
    //
    // };
    // public getCheckIns = async (request: Request, response: Response) => {
    //   const result = await TripService.getTotalCheckInsOrCheckOuts(
    //     request.user.id,
    //     'in',
    //   );
    //   return ResponseHandler.SuccessResponse(
    //     response,
    //     StatusCodes.OK,
    //     'fetched checkins',
    //     { totalCheckIns: result },
    //   );
    // };
    // public getCheckOuts = async (request: Request, response: Response) => {
    //   const result = await TripService.getTotalCheckInsOrCheckOuts(
    //     request.user.id,
    //     'out',
    //   );
    //   return ResponseHandler.SuccessResponse(
    //     response,
    //     StatusCodes.OK,
    //     'fetched checkouts',
    //     { totalCheckOuts: result },
    //   );
    // };
}

export default TripController;
