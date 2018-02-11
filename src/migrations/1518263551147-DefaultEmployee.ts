import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultEmployee1518263551147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`INSERT INTO employee (id,name) VALUES (1,"Depot")`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DELETE FROM employee WHERE id=1`);
    }

}
