import { Context } from 'koa';
import * as Router from "koa-router";
import { getManager, Repository, Connection } from "typeorm";
import { Asset } from '../entities/Asset';

export default class AssetRouter {
  public router: Router;
  private repository: Repository<Asset>

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Asset);
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
    this.router.get('/', this.getAssets.bind(this));
    this.router.post('/', this.saveAsset.bind(this));
    this.router.get('/:id', this.getAssetById.bind(this));
    this.router.patch('/:id', this.updateAsset.bind(this));
    this.router.delete('/:id', this.deleteAsset.bind(this));
  }

  private async getAssetById(ctx: Context) {
    try {
      ctx.body = await this.repository.findOneById(ctx.params.id);
      if (!ctx.body) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

  private async getAssets(ctx: Context) {
    try {
      ctx.body = await this.repository.find({});
      if (ctx.body.length < 1) {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }

  }

  private async saveAsset(ctx: Context) {

  }

  private async updateAsset(ctx: Context) {

  }

  private async deleteAsset(ctx: Context) {
    try {
      ctx.body = await this.repository.removeById(ctx.params.id);
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }

}
