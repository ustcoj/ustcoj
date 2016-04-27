import os
import time
import shutil
import urllib2
import filecmp
from compilers import compilerParameter

class JudgeClient(object):

    def __init__(self,
                 submissionID,
                 code,
                 compiler,
                 timeLimit,
                 memoryLimit,
                 inputUrl,
                 outputUrl
    ):
        self.submissionID = submissionID
        self.code = code
        self.compiler = compiler
        self.timeLimit = timeLimit
        self.memoryLimit = memoryLimit
        self.inputUrl = inputUrl
        self.outputUrl = outputUrl

    def _createFile(self, fileName, content):
        fp = open(fileName, 'w')
        fp.write(content)

    def prepareFiles(self):
        self.dirName = str(self.submissionID) + str(time.time())
        os.mkdir(self.dirName)
        inResponse = urllib2.urlopen(self.inputUrl)
        self.inFileName = self.dirName + '/std.in'
        self._createFile(self.inFileName, inResponse.read())
        outResponse = urllib2.urlopen(self.outputUrl)
        self.outFileName = self.dirName + '/std.out'
        self._createFile(self.outFileName, outResponse.read())
        self.codeFileName = self.dirName + '/' + compilerParameter[self.compiler]["srcName"]
        self.testOutFileName = self.dirName + '/test.out'
        self.exeName = self.dirName + '/Main'
        self._createFile(self.codeFileName, self.code)

    def removeFiles(self):
        shutil.rmtree(self.dirName, ignore_errors = False)

    def _compile(self):
        os.environ['src_path'] = self.codeFileName
        os.environ['exe_path'] = self.exeName
        os.system(compilerParameter[self.compiler]["compileCommand"])

    def _run(self):
        os.environ["exe_path"] = self.exeName
        os.environ['in_path'] = self.inFileName
        os.environ['out_path'] = self.testOutFileName
        os.system(compilerParameter[self.compiler]["runCommand"])

    def _compare(self):
        return filecmp.cmp(self.testOutFileName, self.outFileName)

    def run(self):
        self._compile()
        self._run()
        isSame = self._compare()
        result = {}
        result['submissionID'] = self.submissionID
        result['errCode'] = 0
        result['errInfo'] = 'Accept'
        if (isSame == False) :
            result['errCode'] = 1
            result['errInfo'] = 'Wrong Answer'
        result['time'] = 1
        result['memory'] = 1
        return result