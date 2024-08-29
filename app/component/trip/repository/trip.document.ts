import {Document, Types} from "mongoose";
import {UserInterface} from "../../user/interface/user.interface";

export interface TripDocument extends Document {
  _id: Types.ObjectId;
  checkInType: string;
  dropOffLocation: string;
  checkOutTime: Date;
  checkInTime: Date;
  rider: UserInterface['_id'];
}
