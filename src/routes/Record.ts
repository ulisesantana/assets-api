import { Context } from 'koa';
import * as Router from "koa-router";
import { Connection, EntityManager } from "typeorm";
import { Record } from '../entities/Record';

export default class RecordRouter {
  public router: Router;
  private manager: EntityManager;

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
      ctx.body = await this.manager.query(`
        SELECT r.id, r.date, e.name AS fromEmployee, e2.name AS toEmployee, a.name AS asset
        FROM assets_db.asset AS a, assets_db.record AS r, assets_db.employee AS e, assets_db.employee AS e2
        WHERE r.assetId = a.id AND r.fromEmployeeId = e.id AND r.toEmployeeId = e2.id;
      `);
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

}
