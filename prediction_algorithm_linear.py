__author__ = 'praveenk'

import time
import matplotlib.pyplot as plt
import numpy as np
from sklearn import linear_model
from sklearn.svm import SVR
import data_importer


def train_linear():
    yelp_data = data_importer.get_yelp_data()
    test_data = np.array(yelp_data)
    # print test_data
    yelp_x = yelp_data['data']
    yelp_y = yelp_data['target']
    yelp_x_train = yelp_x[:len(yelp_x)*80/100]
    yelp_y_train = yelp_y[:len(yelp_y)*80/100]

    yelp_x_test = yelp_x[(len(yelp_x)*80/100)+1:]
    yelp_y_test = yelp_y[(len(yelp_y)*80/100)+1:]

    print yelp_x_test[:10]
    print yelp_y_test[:10]

    # Create linear regression object
    regr = linear_model.LinearRegression()

    # Train the model using the training sets
    regr.fit(yelp_x_train, yelp_y_train)

    # The coefficients
    print('Coefficients: \n', regr.coef_)
    # The mean square error
    print("Residual sum of squares: %.2f"% np.mean((regr.predict(yelp_x_test) - yelp_y_test) ** 2))
    # Explained variance score: 1 is perfect prediction
    print('Variance score: %.2f' % regr.score(yelp_x_test, yelp_y_test))
    # print( len(yelp_x))
    # print len(yelp_x_test)
    # print len(yelp_y_test)
    # Plot outputs
    print regr.predict([1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 2, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0])
    return regr


def predict( regr, business_id, features):
    business_features = data_importer.get_bussiness_features_by_id(business_id)
    print business_features
    updated_features = data_importer.change_features(business_features, features)
    print updated_features
    return {'new_rating': regr.predict(updated_features)[0]};

def train_svm():
    yelp_data = data_importer.get_yelp_data()
    test_data = np.array(yelp_data)
    # print test_data
    yelp_x = yelp_data['data']
    yelp_y = yelp_data['target']
    print yelp_x
    print yelp_y 
    # yelp_x_train = yelp_x[:len(yelp_x)*80/100]
    # yelp_y_train = yelp_y[:len(yelp_y)*80/100]

    # yelp_x_test = yelp_x[(len(yelp_x)*80/100)+1:]
    # yelp_y_test = yelp_y[(len(yelp_y)*80/100)+1:]

    # print yelp_x_test[:10]
    # print yelp_y_test[:10]

    svr_poly = SVR(kernel='rbf', C=1e3, gamma=0.1)
    t0 = time.time()
    print('Training SVR algorithm with training data started.')
    y_poly = svr_poly.fit(yelp_x, yelp_y)
    svr_fit = time.time() - t0
    print("SVR complexity and bandwidth selected and model fitted in %.3f s"
      % svr_fit) 
    # # The coefficients
    # print('Coefficients: \n', regr.coef_)
    # # The mean square error
    # print("Residual sum of squares: %.2f"% np.mean((regr.predict(yelp_x_test) - yelp_y_test) ** 2))
    # # Explained variance score: 1 is perfect prediction
    # print('Variance score: %.2f' % regr.score(yelp_x_test, yelp_y_test))
    # # print( len(yelp_x))
    # # print len(yelp_x_test)
    # # print len(yelp_y_test)
    # # Plot outputs
    # print regr.predict([1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 2, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0])
    return y_poly


train_linear()
