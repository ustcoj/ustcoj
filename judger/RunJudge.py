from JudgeClient import JudgeClient
import json
class RunJudge:

    @classmethod
    def judge(self, taskInfo):
        #taskInfo
        # submissionID: int
        # code: string
        # compiler: string
        # timeLimit: int       //MS
        # memoryLimit: int     //KB
        # inputFile: string   //URL
        # outputFile: string  //URL
    
        # return jsonfied dict
        # submissionID: int
        # errCode: int
        # @errInfo: string
        # time: int
        # memory: int
        judgeClient = JudgeClient(
            taskInfo['submissionID'],
            taskInfo['code'],
            taskInfo['compiler'],
            taskInfo['timeLimit'],
            taskInfo['memoryLimit'],
            taskInfo['inputFile'],
            taskInfo['outputFile']
        )
        judgeClient.prepareFiles()
        judgeResult = json.dumps(judgeClient.run())
        judgeClient.removeFiles()
        return judgeResult