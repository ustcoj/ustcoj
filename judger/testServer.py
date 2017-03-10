#!flask/bin/python
from flask import Flask, jsonify
import random
app = Flask(__name__)
data = {
    'submission':{
            'submissionID': 1,
            'code': '#include <bits/stdc++.h>\n\
using namespace std;\n\
\n\
int main() {\n\
    int n;\n\
    scanf(\"%d\", &n);\n\
    printf(\"%d\\n", n);\n\
    return 0;\n\
}',
            'compiler': 'cpp',
            'timeLimit': 100,       #MS
            'memoryLimit': 100,     #KB
            'inputFile': 'http://192.168.1.109:8000/std.in',   #URL
            'outputFile': 'http://192.168.1.109:8000/std.out'  #URL
        }
    }
status = {
        'code': 1       #若code为0表示申请到任务，1表示没有任务
    }

@app.route('/api/judge', methods=['GET'])
def get_tasks():
    status['code'] = 0 #random.randint(0, 1)
    return jsonify({'data': data, 'status': status})

if __name__ == '__main__':
  app.run(debug=True)
