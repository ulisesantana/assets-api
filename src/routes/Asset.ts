import { Context } from 'koa';
import * as Router from "koa-router";
import { Connection, EntityManager } from "typeorm";
import { Asset } from '../entities/Asset';
import { Record } from '../entities/Record';

export default class AssetRouter {
  public router: Router;
  private manager: EntityManager;

  constructor(connection: Connection) {
    this.manager = connection.manager;
    this.router = new Router({ prefix: '/assets' });
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
    this.router.post('/', this.save.bind(this));
    this.router.get('/:id', this.getById.bind(this));
    this.router.patch('/:id', this.updateById.bind(this));
    this.router.delete('/:id', this.deleteById.bind(this));
  }

  private async getById(ctx: Context) {
    try {
      ctx.body = await this.manager.findOneById(Asset, ctx.params.id);
      if (!ctx.body) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getAll(ctx: Context) {
    try {
      ctx.body = await this.manager.find(Asset, {});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async save(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        const asset: Asset = new Asset();
        asset.name = ctx.request.body.name || null;
        asset.notes = ctx.request.body.notes || null;
        asset.blocked = ctx.request.body.blocked || false;
        asset.serialNumber = ctx.request.body.serialNumber || null;

        ctx.body = await manager.save(asset);

        const record: Record = new Record();
        record.assetId = asset.id;

        await manager.save(record);
      });

    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async updateById(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        let id = ctx.params.id;
        let assetUpdate = ctx.request.body;

        if (assetUpdate.employeeId) {
          const asset = await manager.findOneById(Asset, id);
          ctx.body = await manager.updateById(
            Asset,
            id,
            assetUpdate
          );

          const record: Record = new Record();
          record.assetId = id;
          record.fromEmployeeId = asset.employeeId;
          record.toEmployeeId = assetUpdate.employeeId;

          await manager.save(record);
        } else {
          ctx.body = await this.manager.updateById(
            Asset,
            id,
            assetUpdate
          );
        }

      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async deleteById(ctx: Context) {
    try {
      await this.manager.transaction(async manager => {
        ctx.body = await manager.deleteById(Asset, ctx.params.id);
      });
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

}
