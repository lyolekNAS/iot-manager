export * from './deviceController.service';
import { DeviceControllerService } from './deviceController.service';
export * from './placeController.service';
import { PlaceControllerService } from './placeController.service';
export const APIS = [DeviceControllerService, PlaceControllerService];
