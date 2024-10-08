import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import morganBody from 'morgan-body';
import AuthRoute from './component/auth/auth.route';
import EmployeeRoute from './component/employee/employee.route';
import TripRoute from './component/trips/trip.route';
import welcomeMessage from './middleware/welcome.middleware';
import notFoundMiddleware from './middleware/not-found.middleware';
import errorMiddleware from './middleware/error.middleware';
import SharedHelper from './lib/shared.helper';
import RiderRoute from './component/rider/rider.route';

dotenv.config();

class App {
  public app: express.Application;

  public authRoute: AuthRoute = new AuthRoute();

  public businessRoute: RiderRoute = new RiderRoute();

  public employeeRoute: EmployeeRoute = new EmployeeRoute();

  public tripRoute: TripRoute = new TripRoute();

  constructor() {
    this.app = express();
    this.config();
    this.authRoute.routes(this.app);
    this.businessRoute.routes(this.app);
    this.employeeRoute.routes(this.app);
    this.tripRoute.routes(this.app);
    this.app.disable('x-powered-by');
    this.app.set('trust proxy', true);
    this.app.get('/', welcomeMessage);
    this.app.get('*', notFoundMiddleware);
    this.app.get('/debug-sentry', function mainHandler(request, response) {
      throw new Error('My first Sentry error!');
    });
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  private config = (): void => {
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    if (SharedHelper.checkIfEnvironmentIsProductionOrStaging()) {
      morganBody(this.app, {
        logAllReqHeader: false,
        maxBodyLength: 5000,
        logResponseBody: false,
      });
    }
  };
}

export default new App().app;
