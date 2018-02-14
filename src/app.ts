import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from 'koa-logger';
import * as jwt from 'koa-jwt';
import { Connection } from 'typeorm';
import * as bodyParser from 'koa-bodyparser';
import AssetRouter from './routes/Asset';
import EmployeeRouter from './routes/Employee';
import RecordRouter from './routes/Record';
import UserRouter from './routes/User';


export default class App {

  private koa: Koa;
  private connection: Connection

  constructor(connection) {
    this.connection = connection;
    this.koa = new Koa();
    this.middleware();
    this.routes();
  }

  public listen(port: number){
    this.koa.listen(port);
  }

  private middleware(): void {
    this.koa.use(logger());
    this.koa.use(bodyParser());
    this.koa.use(
      jwt({
        secret: process.env.TOKEN_SECRET || 'secret'
      }).unless({path: [/^\/users\/login/]})
    );
  }

  private routes(): void {
    const routes = [ 
      new EmployeeRouter(this.connection),
      new AssetRouter(this.connection),
      new UserRouter(this.connection),
      new RecordRouter(this.connection)
    ];

    routes.forEach(router =>{
      this.koa.use(router.routes());
      this.koa.use(router.allowedMethods());
    });

  }

};
