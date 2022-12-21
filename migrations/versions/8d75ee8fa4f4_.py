"""empty message

Revision ID: 8d75ee8fa4f4
Revises: aad1642ad25b
Create Date: 2022-12-21 16:31:08.972132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8d75ee8fa4f4'
down_revision = 'aad1642ad25b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tabla_clasificadora', schema=None) as batch_op:
        batch_op.add_column(sa.Column('prueba', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tabla_clasificadora', schema=None) as batch_op:
        batch_op.drop_column('prueba')

    # ### end Alembic commands ###
