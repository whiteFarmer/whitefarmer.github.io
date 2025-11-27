

#获取远程最新信息
git fetch --all
#强制重置本地分支：
git reset --hard origin/main
#清理未跟踪的文件（可选）：
git clean -fd


#最常用的命令组合：
git add .
git commit -m "描述"
git push




2. 常规上传代码步骤
# 1. 查看当前文件状态（可选，建议执行）
git status

# 2. 添加所有更改到暂存区
git add .

# 3. 提交更改到本地仓库
git commit -m "提交描述信息"

# 4. 推送到远程仓库
git push origin main


3. 各步骤详细说明

添加文件到暂存区
# 添加所有更改（新增、修改、删除的文件）
git add .

# 只添加特定文件
git add 文件名

# 添加所有 .js 文件
git add *.js

# 添加 src 目录下所有文件
git add src/
提交更改

# 提交并添加描述信息
git commit -m "修复了登录功能的bug"

# 提交更详细的描述
git commit -m "功能：实现用户注册
- 添加注册表单验证
- 完善错误提示
- 优化用户体验"

推送到远程
# 推送到主分支（分支名可能是 main 或 master）
git push origin main

# 第一次推送时设置上游分支
git push -u origin main

# 之后就可以简写为
git push


4. 常用工作流程示例
第一次上传新项目
# 进入项目目录
cd my-project

# 初始化 Git
git init

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 添加所有文件
git add .

# 提交
git commit -m "初始提交"

# 推送到远程
git push -u origin main
日常开发更新

# 拉取远程最新代码（避免冲突）
git pull origin main

# 添加你的更改
git add .

# 提交更改
git commit -m "添加新功能：用户评论系统"

# 推送更改
git push
5. 处理常见情况
如果远程有更新，先拉取

# 方法1：合并方式（推荐）
git pull origin main

# 方法2：如果出现冲突，解决冲突后
git add .
git commit -m "解决合并冲突"
git push
强制推送（谨慎使用）

# 仅在确定要覆盖远程历史时使用
git push -f origin main
上传特定分支

# 创建并切换到新分支
git checkout -b feature-branch

# 在新分支上开发并推送
git add .
git commit -m "新功能开发"
git push -u origin feature-branch
6. 常用 Git 状态检查命令

# 查看当前状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库信息
git remote -v

# 查看分支情况
git branch -a