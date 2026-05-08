from sqlalchemy import create_engine, text

engine = create_engine('postgresql://neondb_owner:npg_HoOAUYMB73XC@ep-raspy-cell-am24q0px-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')

with engine.connect() as connection:
    result = connection.execute(text("SELECT 'Hello Neon!'"))
    print(result.fetchone())

