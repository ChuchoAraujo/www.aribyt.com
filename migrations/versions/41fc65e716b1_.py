"""empty message

Revision ID: 41fc65e716b1
Revises: 8d75ee8fa4f4
Create Date: 2022-12-22 14:11:56.241963

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '41fc65e716b1'
down_revision = '8d75ee8fa4f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tabla_clasificadora', schema=None) as batch_op:
        batch_op.drop_column('prueba')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tabla_clasificadora', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prueba', sa.VARCHAR(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
