import os
import liburl2
import time
import shutil
from compilers import compilerParameter

class JudgeClient:
    
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

    def _createFile(fileName, content):
        fp = open(fileName, 'w')
        fp.write(content)

    def prepareFiles(self):
        self.dirName = str(self.submissionID) + str(time.time())
        os.mkdir(self.dirName)
        inResponse = liburl2.urlopen(self.inputUrl)
        self.inFileName = self.dirName + '/std.in'
        self._createFile(self.inFileName, inResponse.read())
        outResponse = liburl2.urlopen(self.outputUrl)
        self.outFileName = self.dirName + '/std.out'
        self._createFile(self.outFileName, outResponse.read())
        self.codeFileName = self.dirName + '/' + compilerParameter[self.compiler]["srcName"]
        self._createFile(self.codeFileName, self.code)

    def removeFiles(self):
        shutil.rmtree(self.dirName, ignore_errors = True)

    def run(self):
        # TODO