__author__ = 'praveenk'


import MySQLdb

def db_connection():
    db = MySQLdb.connect(host="54.218.47.42", user="user", passwd="password", db="yelp")
    return db

def close_connection(connection):
    if(connection):
        connection.close()

def execute_query(con, query):
    if(con):
        cursor = con.cursor()
        cursor.execute(query)
        # row = cursor.fetchall()
        # cursor.close()
        # print row
        return cursor

def execute_query2(con, query, input):
    args = query,input
    query = "SELECT AcceptsCreditCards, Alcohol, ambience_casual, ambience_classy, ambience_divery, ambience_hipster, ambience_intimate, ambience_romantic, ambience_touristy, ambience_trendy,  ambience_upscale, Attire, delivery, GoodForGroups, GoodforKids, hasTV, noiseLevel,Outdoor_Seating,parking_garage, parking_lot, parking_street,parking_valet, parking_validated,PriceRange, takeOut, takesReservations,Waiter_Service  FROM restaurant_features where restaurant_business_id = %s", (input)
    if(con):
        cursor = con.cursor()
        cursor.execute(*query)
        # row = cursor.fetchall()
        # cursor.close()
        # print row
        return cursor
# con = db_connection()
# execute_query(con, 'select * from restaurant_features limit 1')
# close_connection(con)
