#!/bin/bash


#!/bin/bash

# 定义文件列表文件和排除目录文件路径
exclude_dirs_file="./conf/exclude_dirs.txt"
file_list_file="./conf/file_list.txt"

# 检查文件列表文件是否存在
if [ -f "$file_list_file" ]; then
    # 检查排除目录文件是否存在
    if [ -f "$exclude_dirs_file" ]; then
        # 读取排除目录列表并转换为逗号分隔的字符串
        exclude_dirs=$(paste -sd "," "$exclude_dirs_file")

        # 执行 cloc 命令，使用文件列表文件和排除目录列表
        cloc --list-file="$file_list_file" --exclude-dir="$exclude_dirs"
        # cloc --list-file="$file_list_file" --exclude-dir="$exclude_dirs" --by-file  # 这里多了一个空格
    else
        echo "Exclude directories file not found: $exclude_dirs_file"
        exit 1
    fi
else
    echo "File list file not found: $file_list_file"
    exit 1
fi
