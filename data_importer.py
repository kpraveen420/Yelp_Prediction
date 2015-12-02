__author__ = 'praveenk'

import database_connection as dbc


noise_mapping = {'quiet':1, 'average': 2, 'loud':3, 'very_loud':4}
attire_mapping = {'casual':1, 'dressy':2, 'formal':3}
alcohol_mapping = {'full_bar':1,'none':2, 'beer_and_wine':3}

features_mapping = {'AcceptsCreditCards' : 0, 'Alcohol':1, 'ambience_casual':2, 'ambience_classy':3, 'ambience_divery':4, 'ambience_hipster':5, 'ambience_intimate':6, 'ambience_romantic':7, 'ambience_touristy':8, 'ambience_trendy':9,  'ambience_upscale':10, 'Attire':11, 'delivery':12, 'GoodForGroups':13, 'GoodforKids':14, 'hasTV':15, 'noiseLevel':16, 'Outdoor_Seating':17, 'parking_garage':18, 'parking_lot':19, 'parking_street':20 ,'parking_valet':21, 'parking_validated':22, 'PriceRange':23 , 'takeOut':24, 'takesReservations':25, 'Waiter_Service':26}
restaurant_features_query = 'SELECT AcceptsCreditCards, Alcohol, ambience_casual, ambience_classy, ambience_divery, ambience_hipster, ambience_intimate, ambience_romantic, ambience_touristy, ambience_trendy,  ambience_upscale, Attire, delivery, GoodForGroups, GoodforKids, hasTV, noiseLevel,Outdoor_Seating,parking_garage, parking_lot, parking_street,parking_valet, parking_validated,PriceRange, takeOut, takesReservations,Waiter_Service, restaurant.stars FROM restaurant_features JOIN restaurant ON restaurant_features.restaurant_business_id = restaurant.business_id'

def get_dimentions():
    con = dbc.db_connection()
    cursor = dbc.execute_query(con, 'desc restaurant_features')
    rows = cursor.fetchall()
    dimentions = []
    for row in rows:
        if row != 'restaurant_business_id':
            dimentions.append(row[0])
    dbc.lose_connection(con)
    return dimentions


def get_yelp_data():
    # print 'got request'
    con = dbc.db_connection()
    cursor = dbc.execute_query(con, restaurant_features_query)
    rows = cursor.fetchall()
    test_x_data = []
    test_y_data = []
    # print rows
    for row in rows:
        # print row
        test_touple = []
        index = 0
        for field in row:
            if index<27:
                if index == 1:
                    if field is None or field not in alcohol_mapping:
                        test_touple.append(0)
                    else:
                        test_touple.append(alcohol_mapping[field])
                        # print type(alcohol_mapping[field])
                elif index == 11:
                    if field is None or field not in attire_mapping:
                        test_touple.append(0)
                    else:
                        test_touple.append(attire_mapping[field])

                elif index == 16:
                    if field is None or field not in noise_mapping:
                        test_touple.append(0)
                    else:
                        test_touple.append(noise_mapping[field])
                elif index ==23:
                    test_touple.append(int(field))
                else:
                    test_touple.append(field)
            else:
                test_y_data.append(float(field))
            index = index+1
        test_x_data.append(test_touple)
    dbc.close_connection(con)
    # print test_data
    test_data = {'data':test_x_data, 'target':test_y_data}
    # print test_data
    # print len(test_data['data'])
    # print len(test_data['target'])

    # print test_data['data'][0]
    return test_data


def get_bussiness_features_by_id(business_id):
    con = dbc.db_connection()
    query = "SELECT AcceptsCreditCards, Alcohol, ambience_casual, ambience_classy, ambience_divery, ambience_hipster, ambience_intimate, ambience_romantic, ambience_touristy, ambience_trendy,  ambience_upscale, Attire, delivery, GoodForGroups, GoodforKids, hasTV, noiseLevel,Outdoor_Seating,parking_garage, parking_lot, parking_street,parking_valet, parking_validated,PriceRange, takeOut, takesReservations,Waiter_Service FROM restaurant_features where 'restaurant_business_id' = '%s'"
    print query
    cursor = dbc.execute_query2(con, query, business_id)
    rows = cursor.fetchall()
    if len(rows)>0:
        return get_busness_features_list(rows[0])
    return []

def get_busness_features_list(row):
    print 'get_busness_features_list'
    test_touple = []
    index = 0
    for field in row:
        print test_touple
        if index<27:
            if index == 1:
                if field is None or field not in alcohol_mapping:
                    test_touple.append(0)
                else:
                    test_touple.append(alcohol_mapping[field])
                    # print type(alcohol_mapping[field])
            elif index == 11:
                print field
                print attire_mapping
                # print attire_mapping[field]
                if field is None or field not in attire_mapping:
                    test_touple.append(0)
                else:
                    test_touple.append(attire_mapping[field])

            elif index == 16:
                if field is None or field not in noise_mapping:
                    test_touple.append(0)
                else:
                    test_touple.append(noise_mapping[field])
            elif index ==23:
                test_touple.append(int(field))
            else:
                test_touple.append(field)
        index = index+1
    return test_touple

def change_features(features, features_to_update):

    for feature in features_to_update:
        print features_mapping[feature]
        if features_mapping[feature] == 1:
            print features[features_mapping[feature]]
            print alcohol_mapping[features_to_update[feature]]
            features[features_mapping[feature]] = alcohol_mapping[features_to_update[feature]]
        elif features_mapping[feature] == 11:
            features[features_mapping[feature]] = attire_mapping[features_to_update[feature]]
        elif features_mapping[feature] == 16:
            features[features_mapping[feature]] = noise_mapping[features_to_update[feature]]
        elif features_mapping[feature] == 23:
            features[features_mapping[feature]] = int(features_to_update[feature])
        else:
            features[features_mapping[feature]] = features_to_update[feature]

    return features


# print get_test_data()
