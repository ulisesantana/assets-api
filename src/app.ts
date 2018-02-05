import * as Koa from "koa";
import * as Router from "koa-router";
import * as logger from 'koa-logger';
import { Connection } from 'typeorm';
import * as bodyParser from 'koa-bodyparser';
import AssetRouter from './routes/Asset';
import EmployeeRouter from './routes/Employee';


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
  }

  private routes(): void {
    const routes = [ 
      new AssetRouter(this.connection),
      new EmployeeRouter(this.connection)
    ];

    routes.forEach(router =>{
      this.koa.use(router.routes());
      this.koa.use(router.allowedMethods());
    });

  }

};
