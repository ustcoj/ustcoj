import urllib2
import json
import time
import random
from judger import runJudger

baseUrl = "http://localhost:5000"
taskUrl = baseUrl + "/api/judgea"
sleepTimeLowBound = 500 # ms
sleepTimeHighBound = 5000 # ms

while True:
    sleepTime = random.randint(sleepTimeLowBound, sleepTimeHighBound) / 1000.0
    time.sleep(sleepTime)
    #TODO error handle
    taskRequestResponse = urllib2.urlopen(taskUrl)
    taskInfo = json.loads(taskRequestResponse.read())
    #print(taskInfo)
    if taskInfo['status']['code'] == 1:
        rejudgeFlag = True
        while rejudgeFlag:
            flag = False
            judgeResult = runJudger(taskInfo['data'])
            req = urllib2.Request(taskUrl, judgeResult, {'Content-Type': 'application/json'})
            judgeResponse = urllib2.urlopen(req)
            rejudgeInfo = json.loads(judgeResponse.read())
            if rejudgeInfo['status']['code'] == 1:
                rejudgeFlag = True