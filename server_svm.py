__author__ = 'praveenk'
# from bottle import route, run, template, request, post
from bottle import run, request, post, get
import json
import prediction_algorithm

#@route('/hello/<name>')
#def index(name):
#    return template('<b>Hello {{name}}</b>!', name=name)

@post('/getdata/<business_id>')
def index(business_id):
    print 'Got request, In post'
    # print request.forms.get('features')
    postdata = request.body.read()

    print postdata
    # print json.loads(request.forms.get('features').replace("'", "\""))
    # print request.json('features')
    # features = json.loads(request.forms.get('features').replace("'", "\""))
#    return prediction_algorithm.predict(algorithm, business_id, postdata)
    return prediction_algorithm.predict(algorithm, business_id, json.loads(postdata.replace("'","\"")))
    #return prediction_algorithm.predict(algorithm, business_id, json.loads(postdata))

@get('/getdata/<business_id>/<data>/<value>')
def index(business_id, data, value):
    print 'Got request, In get'
    # print request.forms.get('features')
    # postdata = request.body.read()

    # print postdata
    # print json.loads(request.forms.get('features').replace("'", "\""))
    # print request.json('features')
    # features = json.loads(request.forms.get('features').replace("'", "\""))
    postdata = {data:value}
    print postdata
    return prediction_algorithm.predict(algorithm, business_id, postdata)


algorithm = prediction_algorithm.train_svm()

run(host='localhost', port=9999)
