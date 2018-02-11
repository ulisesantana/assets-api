import { Context } from 'koa';
import * as Router from "koa-router";
import { Connection, EntityManager } from "typeorm";
import { Record } from '../entities/Record';

export default class RecordRouter {
  public router: Router;
  private manager: EntityManager

  constructor(connection: Connection) {
    this.manager = connection.manager;
    this.router = new Router({ prefix: '/records' });
  }

  public routes() {
    this.addRoutes();
    return this.router.routes();
  }

  public allowedMethods() {
    return this.router.allowedMethods();
  }

  private addRoutes(): void {
    this.router.get('/', this.getAll.bind(this));
  }

  // TODO: Add server pagination and fitlering 
  private async getAll(ctx: Context) {
    try {
      ctx.body = await this.manager.find(Record, {});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

}
