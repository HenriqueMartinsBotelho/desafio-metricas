import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMrrMetricsTable1675390000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE mrr_metrics (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                mes VARCHAR(255) NOT NULL,
                mrr DECIMAL NOT NULL,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES "user"(id)
                    ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE mrr_metrics;
        `);
  }
}
