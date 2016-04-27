#!flask/bin/python
from flask import Flask, jsonify
import random
app = Flask(__name__)
data = {
        'submission':{
            'submissionID': 1,
            'code': 'abc',
            'compiler': 'abc',
            'timeLimit': 100,       #MS
            'memoryLimit': 100,     #KB
            'inputFile': 'abc',   #URL
            'outputFile': 'abc'  #URL
        }
    }
status = {
        'code': 1       #若code为0表示申请到任务，1表示没有任务
    }

@app.route('/api/judge', methods=['GET'])
def get_tasks():
    status['code'] = random.randint(0, 1)
    return jsonify({'data': data, 'status': status})
if __name__ == '__main__':
  app.run(debug=True)