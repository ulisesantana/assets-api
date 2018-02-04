import {Context} from 'koa';
import * as Router from "koa-router";
import {getManager, Repository, Connection} from "typeorm";
import {Asset} from '../entities/Asset';

export default class AssetRouter {
  public router: Router;
  private repository: Repository<Asset>

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Asset);
    this.router = new Router({prefix:'/assets'});
    this.addRoutes();
  }

  public routes() {
    return this.router.routes();
  }

  public allowedMethods() {
    return this.router.allowedMethods();
  }

  private addRoutes(): void {
    this.router.get('/', this.getAssets);
    this.router.post('/', this.saveAsset);
    this.router.get('/:id', this.getAssetById);
    this.router.put('/:id', this.updateAsset);
    this.router.delete('/:id', this.deleteAsset);
  }

  private async getAssetById(ctx: Context) {
    ctx.body = 'Hola mundo!';
  }
  
  private async getAssets(ctx: Context) {
    try {
      ctx.body = await this.repository.find({}); 
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }

  }

  private saveAsset(ctx: Context) {

  }

  private updateAsset(ctx: Context) {
  
  }

  private deleteAsset(ctx: Context) {

  }

}
