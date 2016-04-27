compilerParameter = {
    "cpp": {
        "srcName" : "Main.cpp",
        "compileCommand" : "g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 -std=c++11 ${src_path} -lm -o ${exe_path}",
        "runCommand" : "./${exe_path} < ${in_path} > ${out_path}"
    }
}